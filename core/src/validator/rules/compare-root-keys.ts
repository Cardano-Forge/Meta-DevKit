import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { Result } from "../utils/types.ts";

import {
  distance,
  closest,
} from "https://deno.land/x/fastest_levenshtein/mod.ts";

export class CompareRootKeys extends BaseValidator {
  private threshold = 2;

  constructor() {
    const id = "compare-root-keys";
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

    let warnings: string[] = [];

    let similarKeysDetected = false;

    const keys = Object.keys(metadata as object);

    for (const key of keys) {
      const closestKey = closest(
        key,
        keys.filter((fKey) => fKey !== key),
      );

      const distanceValue = distance(key, closestKey);

      if (distanceValue < this.threshold) {
        // console.log(
        //   "Warning detected for",
        //   key,
        //   closestKey,
        //   "with",
        //   distanceValue,
        // );
        warnings.push(`${key} is similar to ${closestKey}`);
      }
    }

    if (warnings.length > 0) {
      similarKeysDetected = true;
    }

    return getStates(
      {
        state: similarKeysDetected ? "warning" : "success",
        message: warnings,
      },
      "No similar keys found.",
      asset_name,
      metadata,
      this.id,
    );
  }
}
