import z from "zod";

import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";
import { checkHex56, checkSize64 } from "./zod.ts";
import type { StateOutput, ZodSafeParse } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";

/**
 * A validator for CIP-25 version 1 assets.
 *
 * This validator uses Zod schema to validate metadata and checks against policy ID and asset name format.
 *
 * @class Cip25Version1
 * @module Rules
 * @extends BaseValidator
 */
export class Cip25Version1 extends BaseValidator {
  /**
   * Creates a new instance of Cip25Version1.
   *
   * @param options - Optional configuration options for the validator.
   */
  constructor(options?: object) {
    const id = "cip-25-version-1";
    super(id, options);
  }

  /**
   * Validates metadata using the Zod schema and checks against policy ID and asset name format.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata to validate.
   * @param _metadatas - An array of metadata objects, currently unused but provided for consistency with other validators.
   * @returns An array of results from validation checks.
   */
  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    logger(`Executing ${this.id} with: `, metadata, assetName);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The core validation logic using Zod schema.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata to validate.
   * @param _metadatas - An array of metadata objects, currently unused but provided for consistency with other validators.
   * @returns An array of results from validation checks.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    const result = z
      .object({
        assetName: checkSize64,
        policyId: checkHex56,
      })
      .safeParse(metadata) as ZodSafeParse;

    return GetValidationOutput(result, assetName, this.id);
  }
}
