import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { type MyDatabase } from "./types";

export const initialize = async () => {
  // create RxDB
  const db = await createRxDatabase<MyDatabase>({
    name: "metadraft",
    storage: getRxStorageDexie(),
  });

  await db.addCollections({
    metadata: metadataSchema,
    validations: validationsSchema,
    project: projectSchema,
  });

  return db;
};

/**
 * Schema
 */

const metadataSchema = {
  schema: {
    title: "metadata",
    version: 0,
    type: "object",
    primaryKey: "id",
    properties: {
      id: {
        type: "string",
        maxLength: 64,
      },
      assetName: {
        type: "string",
        maxLength: 64,
      },
      metadata: {
        type: "object",
      },
      status: {
        type: "string",
      },
    },
    required: ["id", "assetName"],
    indexes: ["assetName", ["id", "assetName"]],
  },
};

const validationsSchema = {
  schema: {
    title: "validations",
    version: 0,
    type: "object",
    primaryKey: "id",
    properties: {
      id: {
        type: "string",
        maxLength: 64,
      },
      assetName: {
        type: "string",
        maxLength: 64,
      },
      validations: {
        type: "object",
      },
    },
    required: ["id", "assetName"],
  },
};

const projectSchema = {
  schema: {
    title: "project",
    version: 0,
    type: "object",
    primaryKey: "id",
    properties: {
      id: {
        type: "string",
        maxLength: 64,
      },
      metadataId: {
        type: "string",
        maxLength: 64,
      },
      name: {
        type: "string",
        maxLength: 64,
      },
      nfts: {
        type: "number",
        minimum: 0,
        default: 0,
      },
      unchecked: {
        type: "number",
        minimum: 0,
        default: 0,
      },
      errorsDetected: {
        type: "number",
        minimum: 0,
        default: 0,
      },
      errorsFlagged: {
        type: "number",
        minimum: 0,
        default: 0,
      },
      valids: {
        type: "number",
        minimum: 0,
        default: 0,
      },
    },
    required: ["id", "metadataId", "name"],
  },
};
