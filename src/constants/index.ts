import { StatusCodes } from "http-status-codes";

export const ErrorMessages = {
  INVALID_ADDRESSES_FORMAT: "The 'addresses' field must be an array",
  INVALID_ADDRESS: (address: string) => `The address '${address}' is not valid`,
  INVALID_ADDRESS_SIMPLE: "Invalid address",
  FAILED_TO_FETCH_BALANCES: "Failed to fetch balances",
};

export const ErrorNames = {
  VALIDATION_ERROR: "ValidationError",
};

export const StatusCodesConstants = {
  OK: StatusCodes.OK,
  BAD_REQUEST: StatusCodes.BAD_REQUEST,
  INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
};
