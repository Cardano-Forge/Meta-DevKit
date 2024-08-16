import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkSize64 } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates that metadata has a valid `name` field with a size less than or equal to 64 characters.
 *
 * @class KeyNameValidator
 * @extends BaseValidator
 */
export class KeyNameValidator extends BaseValidator {
  /**
   * Creates an instance of KeyNameValidator.
   *
   * @param options - Optional configuration for the validator. Currently not used.
   */
  constructor(options?: object) {
    const id = "key-name";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Must contain a valid `name` field with a size less than or equal to 64 characters.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {Result[]} An array of validation results.
   */
  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The core validation logic for the KeyNameValidator class.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Must contain a valid `name` field with a size less than or equal to 64 characters.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {Result[]} An array of validation results.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const result = z
      .object({
        name: checkSize64,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`name` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}
