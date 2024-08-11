import { isAddress } from "viem/utils";
import {
  getBinanceSmartChainBalances,
  getBitcoinBalances,
  getEthereumBalances,
  getPolygonBalances,
} from "./balances";
import validate from "bitcoin-address-validation";

/**
 * Fetches balances from various cryptocurrency networks based on the provided addresses.
 *
 * @param addresses - An array of cryptocurrency addresses to fetch balances for.
 *
 * @returns An object containing balances from the requested networks,
 * or null if an error occurs.
 */
const getBalances = async (addresses: string[]) => {
  // Filter and validate Ethereum addresses
  const ethereumAddresses: string[] = addresses.filter((address: string) => {
    return isAddress(address);
  });

  // Filter and validate Bitcoin addresses
  const bitcoinAddresses: string[] = addresses.filter((address: string) => {
    return validate(address);
  });

  try {
    // Initialize an empty object to store the balances
    const balances: any = {};

    // If there are Bitcoin addresses, fetch Bitcoin balances
    if (bitcoinAddresses.length > 0) {
      balances.bitcoinBalances = await getBitcoinBalances(bitcoinAddresses);
    }

    // If there are Ethereum addresses, fetch balances from Ethereum, Polygon, and Binance Smart Chain
    if (ethereumAddresses.length > 0) {
      const [polygonBalances, binanceSmartChainBalances, ethereumBalances] =
        await Promise.all([
          getPolygonBalances(ethereumAddresses),
          getBinanceSmartChainBalances(ethereumAddresses),
          getEthereumBalances(ethereumAddresses),
        ]);

      balances.polygonBalances = polygonBalances;
      balances.binanceSmartChainBalances = binanceSmartChainBalances;
      balances.ethereumBalances = ethereumBalances;
    }

    // Return the fetched balances
    return balances;
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching balances:", error);

    // Return null in case of an error
    return null;
  }
};

export default getBalances;
