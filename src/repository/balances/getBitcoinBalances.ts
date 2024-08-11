import { Bitcoin, Network, TatumSDK } from "@tatumio/tatum";
import { TATUM_API_KEY } from "../../config";

export const getBitcoinBalances = async (addresses: string[]) => {
  try {
    const tatum = await TatumSDK.init<Bitcoin>({
      network: Network.BITCOIN,
      apiKey: TATUM_API_KEY,
    });

    const balance = await tatum.address.getBalance({
      addresses,
    });
    console.log({ balance });
    // const nfts = await tatum.nft.getBalance({
    //   addresses,
    // });
    // console.log({ nfts });
    tatum.destroy();
    return { balance };
  } catch (error) {
    console.error("Error fetching Binance Smart Chain balance:", error);
    return null;
  }
};
