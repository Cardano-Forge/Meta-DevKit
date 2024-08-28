import { BaseValidator } from "../core.ts";

import type { StateOutput } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";

/**
 * A validator that checks if there are any duplicate image in the provided metadatas.
 *
 * This validator counts the occurrences of each asset name and identifies duplicates based on the count. It assumes that the asset name is the top-level key in each metadata object.
 *
 * @class DuplicateImage
 * @module Rules
 * @extends BaseValidator
 */
export class DuplicateImage extends BaseValidator {
  /**
   * Constructs a new instance of the `DuplicateImage` validator with an optional configuration object.
   *
   * @param {object} [options] - The options for the validator (not used in this validator).
   */
  constructor(options?: object) {
    const id = "duplicate-image";
    super(id, options, "once");
  }

  /**
   * Executes the validation logic for a given asset and metadatas.
   *
   * @param {object[]} metadatas - An array of all metadatas being validated.
   * @param {Record<string, StateOutput>} validations - An object of all validations made.
   * @returns {Record<string, StateOutput>} An array containing the validation results.
   */
  ExecuteOnce(
    metadatas: object[],
    validations: Record<string, StateOutput>,
  ): Record<string, StateOutput> {
    logger(`Executing ${this.id} with: `, metadatas.length);
    return this.Logic(
      metadatas as { image: string | string[]; name: string }[],
      validations,
    );
  }

  /**
   * Logic method to check for duplicate image.
   *
   * @param {{ image: string | string[]; name: string }[]} metadatas - An array of all metadatas being validated.
   * @param {Record<string, StateOutput>} validations - An object of all validations made.
   * @returns {Record<string, StateOutput>} - Returns an array containing validation results.
   */
  Logic(
    metadatas: { image: string | string[]; name: string }[],
    validations: Record<string, StateOutput>,
  ): Record<string, StateOutput> {
    const seen = {
      images: new Set<string>(),
    };

    for (const metadata of metadatas) {
      if (
        typeof metadata === "object" &&
        metadata !== null &&
        "image" in metadata
      ) {
        const image: string = Array.isArray(metadata.image)
          ? metadata.image.join("")
          : metadata.image;
        if (seen.images.has(image)) {
          if (!validations[metadata.name]) {
            validations[metadata.name] = { status: "warning", warnings: [] };
          }
          validations[metadata.name].warnings.push({
            validatorId: this.id,
            message: `Image: ${image} has been detected as a duplicate.`,
          });
          validations[metadata.name].status = "warning";
        }
        seen.images.add(image);
      }
    }
    return validations;
  }
}
