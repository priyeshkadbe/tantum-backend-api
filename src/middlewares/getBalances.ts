import validate from "bitcoin-address-validation";
import { NextFunction, Request, Response } from "express";
import { isAddress } from "viem";
import { ErrorMessages, ErrorNames, StatusCodesConstants } from "../constants";
import { getBalancesRepository } from "../repository";
import AppErrors from "../utils/app-errors";

/**
 * Controller function to handle the request for fetching balances.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction for passing control to the next middleware
 *
 * @description This function validates the 'addresses' provided in the request body.
 * If the addresses are valid, it fetches the balances using the getBalancesRepository function.
 * In case of any validation errors or issues while fetching balances, it throws an AppError,
 * which is handled by the error handling middleware.
 */
export const getBalances = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract 'addresses' from the request body
    const { addresses } = req.body;

    // Validate that 'addresses' is an array
    if (!addresses || !Array.isArray(addresses)) {
      throw new AppErrors(
        ErrorNames.VALIDATION_ERROR,
        ErrorMessages.INVALID_ADDRESS_SIMPLE,
        ErrorMessages.INVALID_ADDRESSES_FORMAT,
        StatusCodesConstants.BAD_REQUEST
      );
    }

    // Check each address in the array to ensure it's valid
    for (const address of addresses) {
      if (!isAddress(address) && !validate(address)) {
        throw new AppErrors(
          ErrorNames.VALIDATION_ERROR,
          ErrorMessages.INVALID_ADDRESS_SIMPLE,
          ErrorMessages.INVALID_ADDRESS(address),
          StatusCodesConstants.BAD_REQUEST
        );
      }
    }

    // Fetch the balances for the validated addresses
    const balances = await getBalancesRepository(addresses);

    // Send the fetched balances as the response
    res.status(200).json(balances);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};
