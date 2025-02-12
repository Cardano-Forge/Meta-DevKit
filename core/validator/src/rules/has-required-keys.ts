import { ZodError } from "zod";
import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";
import { logger } from "../utils/logger.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { StateOutput, ZodSafeParse } from "../utils/types.ts";

/**
 * A validator ensuring that metadata includes essential fields such as "name", "description", and "image".
 *
 * @class HasRequiredKeys
 * @module Rules
 * @extends BaseValidator
 */
export class HasRequiredKeys extends BaseValidator {
  /**
   * Creates an instance of HasRequiredKeys.
   *
   * @param {object} [options] - The options for the validator.
   */
  constructor(options?: object) {
    const id = "has-required-keys";
    super(id, options);
  }

  /**
   * Executes the validation logic for required keys in metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {StateOutput} - An array of validation results.
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
   * The main validation logic for checking required keys in metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {StateOutput} - An array of validation results.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const keys = Object.keys(metadata as object);

    const requiredKeys = ["name", "image"];

    const hasAllRequiredKeys = requiredKeys.every((requiredKey) =>
      keys.some((key) => key === requiredKey)
    );

    const result: ZodSafeParse = {
      success: !hasAllRequiredKeys,
      error: !hasAllRequiredKeys
        ? new ZodError([
            {
              code: "custom",
              message: `Required keys missing: ["name", "image"]. Keys received: ${keys.join(
                ", "
              )}`,
              path: [],
            },
          ])
        : undefined,
    };

    return GetValidationOutput(result, assetName, this.id);
  }
}
