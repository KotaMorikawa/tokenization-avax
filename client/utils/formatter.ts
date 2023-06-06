import { BigNumber, ethers } from "ethers";

export const weiToAvax = (wei: BigNumber) => {
  return ethers.utils.formatEther(wei);
};

export const avaxToWei = (avax: string) => {
  return ethers.utils.parseEther(avax);
};

export const blockTimeToDate = (timeStamp: BigNumber) => {
  return new Date(timeStamp.toNumber() * 1000); // milliseconds to seconds
};
