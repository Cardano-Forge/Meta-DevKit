import { ZodError } from "zod";
import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";
import { logger } from "../utils/logger.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type {
  OptionsWithThreshold,
  StateOutput,
  ZodSafeParse,
} from "../utils/types.ts";

import { distance, closest } from "fastest_levenshtein";

/**
 * A validator that checks if root value strings in metadata are too similar to each other based on a Levenshtein distance threshold.
 *
 * This validator filters out non-string values and calculates the Levenshtein distance between the remaining string values. It considers two values as similar if their distance is less than or equal to the provided threshold.
 *
 * @class CompareRootValues
 * @module Rules
 * @extends BaseValidator
 */
export class CompareRootValues extends BaseValidator {
  /**
   * Constructs a new instance of the `CompareRootValues` validator.
   *
   * @param {object} [options] - The options for the validator.
   * @param {number} [options.threshold=2] - The Levenshtein distance threshold below which values are considered similar.
   */
  constructor(options?: OptionsWithThreshold) {
    const id = "compare-root-values";
    super(id, { threshold: 2, ...options });
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of all metadatas (not used in this validator).
   * @returns {StateOutput} An array containing the validation results.
   */
  override Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    logger(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The main logic of the validator that checks for similar root value strings in the provided metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of all metadatas (not used in this validator).
   * @returns {StateOutput} An array containing the validation results.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings = new ZodError([]);

    const values = Object.values(metadata as object);

    const stringValues = values.filter(
      (valueToCheck) => typeof valueToCheck === "string"
    );

    for (const value of stringValues) {
      const closestValue = closest(
        value,
        stringValues.filter((valueToCheck) => valueToCheck !== value)
      );

      const distanceValue = distance(value, closestValue);

      if (distanceValue < (this.options as OptionsWithThreshold).threshold) {
        warnings.addIssue({
          code: "custom",
          message: `${value} is similar to ${closestValue}`,
          path: [value],
        });
      }
    }

    const hasWarning = warnings.issues.length > 0;

    const result: ZodSafeParse = {
      success: hasWarning,
      error: hasWarning ? warnings : undefined,
    };

    return GetValidationOutput(result, assetName, this.id);
  }
}
