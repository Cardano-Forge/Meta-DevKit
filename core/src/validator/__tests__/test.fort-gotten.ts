// deno test -A test.fort-gotten.ts
import { assertEquals } from "@std/assert";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { Decorator } from "../src/core.ts";

import { Cip25Version1Validator } from "../src/rules/cip-25-version-1.ts";
import { Cip25Version2Validator } from "../src/rules/cip-25-version-2.ts";
import { KeyNameValidator } from "../src/rules/key-name.ts";
import { KeyImageValidator } from "../src/rules/key-image.ts";
import { KeyMediaTypeValidator } from "../src/rules/key-media-type.ts";
import { KeyDescriptionValidator } from "../src/rules/key-description.ts";
import { KeyFilesValidator } from "../src/rules/key-files.ts";
import { KeyAttributesValidator } from "../src/rules/key-attributes.ts";
import { KeyTraitsValidator } from "../src/rules/key-traits.ts";

const mapping = {
  Cip25Version1Validator: Cip25Version1Validator,
  Cip25Version2Validator: Cip25Version2Validator,
  KeyNameValidator: KeyNameValidator,
  KeyImageValidator: KeyImageValidator,
  KeyMediaTypeValidator: KeyMediaTypeValidator,
  KeyDescriptionValidator: KeyDescriptionValidator,
  KeyFilesValidator: KeyFilesValidator,
  KeyAttributesValidator: KeyAttributesValidator,
  KeyTraitsValidator: KeyTraitsValidator,
} as const;

Deno.test("fort-gotten.json", async () => {
  const metadata = JSON.parse(
    readFileSync(join("__tests__", "payloads", "fort-gotten.json"), "utf8"),
  );

  const validatorsReceivedFromFrontend: Array<keyof typeof mapping> = [
    // "Cip25Version1Validator",
    // "Cip25Version2Validator",
    "KeyNameValidator",
    "KeyImageValidator",
    "KeyMediaTypeValidator",
    "KeyDescriptionValidator",
    "KeyFilesValidator",
    "KeyAttributesValidator",
    "KeyTraitsValidator",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    await mainValidator.Execute(
      Object.keys(
        asset_metadata["721"][
          "48ef9fb80a0ad2fd9f3d5b981ef3bfac2bae84137523217b387a775b"
        ],
      )[0],
      Object.values(
        asset_metadata["721"][
          "48ef9fb80a0ad2fd9f3d5b981ef3bfac2bae84137523217b387a775b"
        ],
      )[0],
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  console.log(JSON.stringify(result));

  assertEquals(result, [
    {
      state: "success",
      message: "`name` field is valid.",
      input: {
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e03c9389d69-202111002110"],
        Hat: "None",
        "Kid Number": "3195",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Scout",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3195",
            src: "ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR",
          },
        ],
        image: "ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3195",
      },
      output: { name: "Fort Gotten Ep02 Kid #3195" },
      asset_name: "FortGottenEp02Kid3195",
      validator_id: "key-name",
    },
    {
      state: "success",
      message: "`image` field is valid.",
      input: {
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e03c9389d69-202111002110"],
        Hat: "None",
        "Kid Number": "3195",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Scout",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3195",
            src: "ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR",
          },
        ],
        image: "ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3195",
      },
      output: {
        image: "ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ",
      },
      asset_name: "FortGottenEp02Kid3195",
      validator_id: "key-image",
    },
    {
      state: "success",
      message: "`mediaType` field is valid.",
      input: {
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e03c9389d69-202111002110"],
        Hat: "None",
        "Kid Number": "3195",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Scout",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3195",
            src: "ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR",
          },
        ],
        image: "ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3195",
      },
      output: { mediaType: "image/png" },
      asset_name: "FortGottenEp02Kid3195",
      validator_id: "key-media-type",
    },
    {
      state: "success",
      message: "`description` field is valid.",
      input: {
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e03c9389d69-202111002110"],
        Hat: "None",
        "Kid Number": "3195",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Scout",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3195",
            src: "ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR",
          },
        ],
        image: "ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3195",
      },
      output: {},
      asset_name: "FortGottenEp02Kid3195",
      validator_id: "key-description",
    },
    {
      state: "success",
      message: "`files` field is valid.",
      input: {
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e03c9389d69-202111002110"],
        Hat: "None",
        "Kid Number": "3195",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Scout",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3195",
            src: "ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR",
          },
        ],
        image: "ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3195",
      },
      output: {
        files: [
          {
            name: "Fort Gotten Ep02 Kid #3195",
            mediaType: "image/png",
            src: "ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR",
          },
        ],
      },
      asset_name: "FortGottenEp02Kid3195",
      validator_id: "key-files",
    },
    {
      state: "success",
      message: "`attributes` field is valid.",
      input: {
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e03c9389d69-202111002110"],
        Hat: "None",
        "Kid Number": "3195",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Scout",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3195",
            src: "ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR",
          },
        ],
        image: "ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3195",
      },
      output: {},
      asset_name: "FortGottenEp02Kid3195",
      validator_id: "key-attributes",
    },
    {
      state: "success",
      message: "`traits` field is valid.",
      input: {
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e03c9389d69-202111002110"],
        Hat: "None",
        "Kid Number": "3195",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Scout",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3195",
            src: "ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR",
          },
        ],
        image: "ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3195",
      },
      output: {},
      asset_name: "FortGottenEp02Kid3195",
      validator_id: "key-traits",
    },
    {
      state: "success",
      message: "`name` field is valid.",
      input: {
        attributes: { Head: 21 },
        traits: ["test", 21],
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e141ec5373712224-202111022212"],
        Hat: "None",
        "Kid Number": "3963",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Cleric",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3963",
            src: "ipfs://QmPAA4Y9SQdCFwWbDqJfk614huHwujnvy2AQN35mYbWBBr",
          },
        ],
        image: "ipfs://QmW1Z98f2u8oPJK9E9Hi3KEXNjzwdas3aT7iQzpX1525yS",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3963",
      },
      output: { name: "Fort Gotten Ep02 Kid #3963" },
      asset_name: "FortGottenEp02Kid3963",
      validator_id: "key-name",
    },
    {
      state: "success",
      message: "`image` field is valid.",
      input: {
        attributes: { Head: 21 },
        traits: ["test", 21],
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e141ec5373712224-202111022212"],
        Hat: "None",
        "Kid Number": "3963",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Cleric",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3963",
            src: "ipfs://QmPAA4Y9SQdCFwWbDqJfk614huHwujnvy2AQN35mYbWBBr",
          },
        ],
        image: "ipfs://QmW1Z98f2u8oPJK9E9Hi3KEXNjzwdas3aT7iQzpX1525yS",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3963",
      },
      output: {
        image: "ipfs://QmW1Z98f2u8oPJK9E9Hi3KEXNjzwdas3aT7iQzpX1525yS",
      },
      asset_name: "FortGottenEp02Kid3963",
      validator_id: "key-image",
    },
    {
      state: "success",
      message: "`mediaType` field is valid.",
      input: {
        attributes: { Head: 21 },
        traits: ["test", 21],
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e141ec5373712224-202111022212"],
        Hat: "None",
        "Kid Number": "3963",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Cleric",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3963",
            src: "ipfs://QmPAA4Y9SQdCFwWbDqJfk614huHwujnvy2AQN35mYbWBBr",
          },
        ],
        image: "ipfs://QmW1Z98f2u8oPJK9E9Hi3KEXNjzwdas3aT7iQzpX1525yS",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3963",
      },
      output: { mediaType: "image/png" },
      asset_name: "FortGottenEp02Kid3963",
      validator_id: "key-media-type",
    },
    {
      state: "success",
      message: "`description` field is valid.",
      input: {
        attributes: { Head: 21 },
        traits: ["test", 21],
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e141ec5373712224-202111022212"],
        Hat: "None",
        "Kid Number": "3963",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Cleric",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3963",
            src: "ipfs://QmPAA4Y9SQdCFwWbDqJfk614huHwujnvy2AQN35mYbWBBr",
          },
        ],
        image: "ipfs://QmW1Z98f2u8oPJK9E9Hi3KEXNjzwdas3aT7iQzpX1525yS",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3963",
      },
      output: {},
      asset_name: "FortGottenEp02Kid3963",
      validator_id: "key-description",
    },
    {
      state: "success",
      message: "`files` field is valid.",
      input: {
        attributes: { Head: 21 },
        traits: ["test", 21],
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e141ec5373712224-202111022212"],
        Hat: "None",
        "Kid Number": "3963",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Cleric",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3963",
            src: "ipfs://QmPAA4Y9SQdCFwWbDqJfk614huHwujnvy2AQN35mYbWBBr",
          },
        ],
        image: "ipfs://QmW1Z98f2u8oPJK9E9Hi3KEXNjzwdas3aT7iQzpX1525yS",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3963",
      },
      output: {
        files: [
          {
            name: "Fort Gotten Ep02 Kid #3963",
            mediaType: "image/png",
            src: "ipfs://QmPAA4Y9SQdCFwWbDqJfk614huHwujnvy2AQN35mYbWBBr",
          },
        ],
      },
      asset_name: "FortGottenEp02Kid3963",
      validator_id: "key-files",
    },
    {
      state: "warning",
      message: {
        formErrors: [],
        fieldErrors: {
          attributes: [
            {
              message: "It is recommended to use string instead of number",
              errorCode: "custom",
              status: "warning",
              path: "attributes/Head",
            },
          ],
        },
      },
      input: {
        attributes: { Head: 21 },
        traits: ["test", 21],
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e141ec5373712224-202111022212"],
        Hat: "None",
        "Kid Number": "3963",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Cleric",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3963",
            src: "ipfs://QmPAA4Y9SQdCFwWbDqJfk614huHwujnvy2AQN35mYbWBBr",
          },
        ],
        image: "ipfs://QmW1Z98f2u8oPJK9E9Hi3KEXNjzwdas3aT7iQzpX1525yS",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3963",
      },
      asset_name: "FortGottenEp02Kid3963",
      validator_id: "key-attributes",
      output: undefined,
    },
    {
      state: "warning",
      message: {
        formErrors: [],
        fieldErrors: {
          traits: [
            {
              message: "All elements in the array should be of the same type.",
              errorCode: "custom",
              status: "warning",
              path: "traits",
            },
            {
              message: "It is recommended to use string instead of number",
              errorCode: "custom",
              status: "warning",
              path: "traits/1",
            },
          ],
        },
      },
      output: undefined,
      input: {
        attributes: { Head: 21 },
        traits: ["test", 21],
        Accessory: "None",
        Backpack: "None",
        Body: "Icy Lavender",
        Camp: "BURUKA",
        Clothing: "None",
        Episode: "Beyond The Forest",
        FGI: ["e141ec5373712224-202111022212"],
        Hat: "None",
        "Kid Number": "3963",
        "Kidz Journal": { Achievement: "None", Customizations: 1 },
        Mask: "None",
        Necklace: "None",
        Region: "Mountains",
        Role: "Cleric",
        Staff: "None",
        Straps: "None",
        Website: "https://fort-gotten.com",
        Wheelchair: "None",
        files: [
          {
            mediaType: "image/png",
            name: "Fort Gotten Ep02 Kid #3963",
            src: "ipfs://QmPAA4Y9SQdCFwWbDqJfk614huHwujnvy2AQN35mYbWBBr",
          },
        ],
        image: "ipfs://QmW1Z98f2u8oPJK9E9Hi3KEXNjzwdas3aT7iQzpX1525yS",
        mediaType: "image/png",
        name: "Fort Gotten Ep02 Kid #3963",
      },
      asset_name: "FortGottenEp02Kid3963",
      validator_id: "key-traits",
    },
  ]);
});
