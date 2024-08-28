import type { ZodError } from "zod";
/**
 * Type representing a formatted error object containing message, errorCode, status, and path.
 */
export interface FormatError {
  /**
   * The error message.
   */
  message: string;

  /**
   * The error code associated with the issue.
   */
  errorCode: string;

  /**
   * The current validation state (e.g., success, warning, error). Defaults to `undefined`.
   */
  status?: string | undefined;

  /**
   * The path within the data structure where the error occurred.
   */
  path: string;
}

/**
 * Type representing an object containing form and field errors.
 */
export interface FormattedError {
  /**
   * An empty array for form errors (currently not used).
   */
  formErrors: [];

  /**
   * A record containing field-specific errors keyed by the field name.
   */
  fieldErrors: Record<string, Array<FormatError>>;
}

/**
 * A union type representing validation states: success, warning, or error.
 */
export type State = "success" | "warning" | "error";

/**
 * Interface representing a validator with a unique `id` (tracker) and an `Execute` method that returns validation results.
 */
export interface IValidator {
  /**
   * A unique identifier for the validator (used as a tracker).
   */
  id: string;
  /**
   * A type of validator to run per asset or once per validation.
   */
  type: "once" | "all";

  /**
   * Executes the validation logic with provided asset name, metadata, and metadatas.
   *
   * @param {string} _assetName - The name of the asset being validated.
   * @param {unknown} _metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of additional metadata objects.
   * @returns {StateOutput} An object of validation results.
   */
  Execute(
    _assetName: string,
    _metadata: unknown,
    _metadatas: unknown[],
  ): StateOutput;

  /**
   * Executes the validation logic with provided asset name, metadata, and metadatas.
   *
   * @param {unknown[]} _metadatas - An array of additional metadata objects.
   * @param {Record<string, StateOutput>} _validations An object of validation results.
   * @returns {Record<string, StateOutput>} An object of validation results.
   */
  ExecuteOnce(
    _metadatas: unknown[],
    _validations: Record<string, StateOutput>,
  ): Record<string, StateOutput>;
}

/**
 * Interface representing a validator with a unique `id` (tracker) and an `Execute` method that returns validation results.
 */
export interface IMainValidator {
  /**
   * A unique identifier for the validator (used as a tracker).
   */
  id: string;
  /**
   * A type of validator to run per asset or once per validation.
   */
  type: "once" | "all";

  /**
   * Executes the validation logic with provided asset name, metadata, and metadatas.
   *
   * @param {string} _assetName - The name of the asset being validated.
   * @param {unknown} _metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of additional metadata objects.
   * @returns {Record<string, StateOutput>} An object of validation results.
   */
  Execute(
    _assetName: string,
    _metadata: unknown,
    _metadatas: unknown[],
  ): Record<string, StateOutput>;

  /**
   * Executes the validation logic with provided asset name, metadata, and metadatas.
   *
   * @param {unknown[]} _metadatas - An array of additional metadata objects.
   * @returns {Record<string, StateOutput>} An object of validation results.
   */
  ExecuteOnce(_metadatas: unknown[]): Record<string, StateOutput>;
}

/**
 * Type representing a key with its corresponding path within the data structure.
 */
export type KeyWithPath = {
  /**
   * The key name.
   */
  key: string;

  /**
   * The path where the key is located in the data structure.
   */
  path: string;
};

/**
 * Type representing an array of keys with their corresponding paths.
 */
export type KeyWithPaths = KeyWithPath[];

/**
 * Type representing a record containing data keyed by string.
 */
export type DataRead = Record<string, unknown>;

/**
 * Interface representing a data reader capable of loading and reading data based on the provided path or data object.
 */
export interface IReader {
  /**
   * The current data being read by the reader.
   */
  data: DataRead[] | null;

  /**
   * Loads data asynchronously from the given path or returns it synchronously if already available.
   *
   * @param {string} pathOrData - Either a file path to load or an existing data object.
   * @returns {Promise<object> | object} The loaded data.
   */
  Load(pathOrData: string): Promise<object> | object;

  /**
   * Reads and returns either an array of data records asynchronously or synchronously if already available.
   *
   * @returns {DataRead[] | null} An array of data records.
   */
  Read(): DataRead[] | null;
}

/**
 * Type representing options for CSV processing, such as delimiter, valueByType, subArray, and quotedField settings.
 */
export type CsvOptions = {
  /**
   * The character used to delimit fields in the CSV file.
   */
  delimiter: string;

  /**
   * Whether to infer data types based on values when reading CSV files.
   */
  valueByType: boolean;

  /**
   * An array containing two strings representing the start and end characters for sub-arrays in CSV files.
   */
  subArray: [string, string];

  /**
   * Whether fields with spaces should be quoted in the output CSV file.
   */
  quotedField: boolean;
};

/**
 * Type representing an object containing Zod error information along with success status and data.
 */
export type ZodStateError = {
  /**
   * The error encountered during validation using Zod.
   */
  error: ZodError;

  /**
   * A boolean indicating whether the validation was successful (false when there's an error).
   */
  success: boolean;

  /**
   * The data associated with the validation attempt.
   */
  data: object;
};

/**
 * Type representing a general state error object containing state, message, and data.
 */
export type StateError = {
  /**
   * The current validation state (e.g., success, warning, error).
   */
  state: State;

  /**
   * An optional error message associated with the state.
   */
  message?: string | undefined;

  /**
   * The data associated with the validation attempt.
   */
  data: object;
};

export type OptionsWithThreshold = {
  threshold: number;
};

export type StateOutput = {
  status: State;
  warnings: Array<{
    validatorId: string;
    message: string | object | undefined;
  }>;
};
