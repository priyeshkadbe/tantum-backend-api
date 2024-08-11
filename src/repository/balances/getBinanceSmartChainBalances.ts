import { BinanceSmartChain, Network, TatumSDK } from "@tatumio/tatum";
import { TATUM_API_KEY } from "../../config";

export const getBinanceSmartChainBalances = async (addresses: string[]) => {
  try {
    const tatum = await TatumSDK.init<BinanceSmartChain>({
      network: Network.BINANCE_SMART_CHAIN,
      apiKey: TATUM_API_KEY,
    });

    const balance = await tatum.address.getBalance({
      addresses,
    });

    const nfts = await tatum.nft.getBalance({
      addresses,
    });
    console.log({ nfts });
    tatum.destroy();
    return { balance, nfts };
  } catch (error) {
    console.error("Error fetching Binance Smart Chain balance:", error);
    return null;
  }
};
