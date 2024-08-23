import { assertEquals } from "@std/assert";
import { join } from "node:path";
import { readFileSync } from "node:fs";

import { mapping, Validator } from "../../src/mod.ts";

Deno.test("TestMogi", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "mogi.json"), "utf8"),
    ),
  ];

  const validatorsReceivedFromFrontend: Array<keyof typeof mapping> = [
    "hasRequiredKeysValidator",
    "compareRootKeys",
    "compareRootValues",
    "keyTitleCase",
    "keyCamelCase",
    "keyWhiteSpace",
    "keyNameValidator",
    "keyLength",
    "keyMediaTypeValidator",
    "keyImageValidator",
    "keyFilesValidator",
    "keyDescriptionValidator",
    "keyAlphanumeric",
    "duplicateImage",
    "duplicateAssetName",
    "duplicateKeysValidator",
  ];

  const mainValidator = new Validator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      Object.keys(asset_metadata)[0],
      Object.values(asset_metadata)[0],
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "success",
      message: "All required keys are present.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "has-required-keys",
    },
    {
      state: "success",
      message: "No similar keys found.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "compare-root-keys",
    },
    {
      state: "success",
      message: "No similar values found.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "compare-root-values",
    },
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Title Case formatting.",
        warnings: [
          { key: "name", path: "name" },
          { key: "image", path: "image" },
          { key: "mediaType", path: "mediaType" },
          { key: "description", path: "description" },
        ],
      },
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "key-title-case",
    },
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Camel Case formatting.",
        warnings: [
          { key: "Bg", path: "Bg" },
          { key: "Fur", path: "Fur" },
          { key: "Hat", path: "Hat" },
          { key: "Eyes", path: "Eyes" },
          { key: "Mouth", path: "Mouth" },
          { key: "Clothes", path: "Clothes" },
          { key: "Discord", path: "Discord" },
          { key: "Twitter", path: "Twitter" },
          { key: "Weather", path: "Weather" },
        ],
      },
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "key-camel-case",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "key-white-space",
    },
    {
      state: "success",
      message: "`name` field is valid.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: { name: "Mogi #0655" },
      assetName: "Mogi655",
      validatorId: "key-name",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "key-length",
    },
    {
      state: "success",
      message: "`mediaType` field is valid.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: { mediaType: "image/png" },
      assetName: "Mogi655",
      validatorId: "key-media-type",
    },
    {
      state: "success",
      message: "`image` field is valid.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: {
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
      },
      assetName: "Mogi655",
      validatorId: "key-image",
    },
    {
      state: "success",
      message: "`files` field is valid.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: {},
      assetName: "Mogi655",
      validatorId: "key-files",
    },
    {
      state: "success",
      message: "`description` field is valid.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: { description: "The dankest cet on Cardano." },
      assetName: "Mogi655",
      validatorId: "key-description",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "key-alphanumeric",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "duplicate-image",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "duplicate-asset-name",
    },
    {
      state: "success",
      message: "No significant duplicates detected in the metadata.",
      input: {
        Bg: "PK",
        Fur: "DEVON REX",
        Hat: "FLAMING BEAN",
        Eyes: "PING",
        name: "Mogi #0655",
        Mouth: "RAT TOOFS",
        image: "ipfs://QmZZfapLXRyZBLwoZmiD5Pmc3f4y3C8hkF1MZcZiSjJwko",
        Clothes: "BITBOY",
        Discord: "https://discord.gg/MyProject",
        Twitter: "https://twitter.com/MyProject",
        Weather: "FINE AFTERNOON",
        mediaType: "image/png",
        description: "The dankest cet on Cardano.",
      },
      output: undefined,
      assetName: "Mogi655",
      validatorId: "duplicate-keys",
    },
  ]);
});