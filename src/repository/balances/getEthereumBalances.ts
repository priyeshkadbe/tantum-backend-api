import { Network, Polygon, TatumSDK } from "@tatumio/tatum";
import { TATUM_API_KEY } from "../../config";

export const getEthereumBalances = async (addresses: string[]) => {
  try {
    const tatum = await TatumSDK.init<Polygon>({
      network: Network.POLYGON,
      apiKey: TATUM_API_KEY,
    });

    const balance = await tatum.address.getBalance({
      addresses,
    });

    const nfts = await tatum.nft.getBalance({
      addresses,
    });

    tatum.destroy();
    return { balance, nfts };
  } catch (error) {
    console.error("Error fetching Polygon balance:", error);
    return null;
  }
};
