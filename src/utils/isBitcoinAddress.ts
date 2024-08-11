import { validate } from "bitcoin-address-validation";

export const isValidBitcoinAddress = (address: string): boolean => {
  return validate(address);
};
