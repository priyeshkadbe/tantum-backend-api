import validate from "bitcoin-address-validation";
import { Request, Response } from "express";
import { isAddress } from "viem";
import { ErrorMessages, StatusCodesConstants } from "../constants";
import { getBalancesRepository } from "../repository";

/**
 * Controller function to handle requests for fetching balances.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 *
 * @description This function validates the 'addresses' provided in the request body.
 * If the addresses are valid, it fetches the balances using the getBalancesRepository function.
 * In case of any validation errors or issues while fetching balances, it sends an appropriate
 * response with a status code and error message.
 */
const getBalances = async (req: Request, res: Response) => {
  try {
    // Extract 'addresses' from the request body
    const { addresses } = req.body;
    console.log({ addresses });

    const ethereumAddresses: string[] = [];
    const bitcoinAddresses: string[] = [];

    // Separate Ethereum and Bitcoin addresses into different arrays
    console.log("Before separating addresses");
    // addresses.forEach((address: string) => {
    //   if (isAddress(address)) {
    //     ethereumAddresses.push(address);
    //   } else if (validate(address)) {
    //     bitcoinAddresses.push(address);
    //   }
    // });
    console.log("After separating addresses");
    console.log({ ethereumAddresses, bitcoinAddresses });
    // Fetch the balances for the validated addresses
    const balances = await getBalancesRepository(addresses);

    // Send the fetched balances as the response
    res.status(StatusCodesConstants.OK).json(balances);
  } catch (error) {
    // Log the error and send a generic error response
    console.error("Error fetching balances:", error);
    res.status(StatusCodesConstants.INTERNAL_SERVER_ERROR).send({
      error: ErrorMessages.FAILED_TO_FETCH_BALANCES,
    });
  }
};

export default getBalances;
