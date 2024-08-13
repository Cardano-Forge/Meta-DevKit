import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { KeyWithPath, Result } from "../utils/types.ts";
import { isTitleCase } from "../utils/casing.ts";
import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";

/**
 * Validates metadata keys follow Title Case formatting.
 */
export class KeyTitleCase extends BaseValidator {
  constructor() {
    const id = "key-title-case";
    super(id);
  }

  async Execute(
    asset_name: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Promise<Result[]> {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(asset_name, metadata, _metadatas);
  }

  Logic(
    asset_name: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    const isInvalid = metadataValidator(asset_name, metadata, this.id);
    if (isInvalid) return isInvalid;

    let warnings: KeyWithPath[] = [];

    const keys = extractKeysWithPaths(metadata as object);
    // console.debug("KEYS", keys);

    keys.forEach((key) => {
      if (!isTitleCase(key.key)) {
        warnings.push(key);
      }
    });

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Some keys do not adhere to Title Case formatting.",
          warnings,
        },
      },
      "All checks passed. No issues detected.",
      asset_name,
      metadata,
      this.id,
    );
  }
}