import {
  getBinanceSmartChainBalances,
  getBitcoinBalances,
  getPolygonBalances,
} from "./balances";

/**
 * Fetches balances from both Polygon and Binance Smart Chain networks.
 *
 * @param addresses - An array of cryptocurrency addresses to fetch balances for.
 *
 * @returns An object containing balances from both Polygon and Binance Smart Chain networks,
 * or `null` if an error occurs.
 */
const getBalances = async (addresses: string[]) => {
  try {
    // Fetch balances from both Polygon and Binance Smart Chain networks in parallel
    const [polygonBalances, binanceSmartChainBalances, bitcoinBalances] =
      await Promise.all([
        getPolygonBalances(addresses),
        getBinanceSmartChainBalances(addresses),
        getBitcoinBalances(addresses),
      ]);

    // Return the fetched balances as an object
    return {
      polygonBalances,
      binanceSmartChainBalances,
    };
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching balances:", error);

    // Return null in case of an error
    return null;
  }
};

export default getBalances;
