import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

import AssetTokenizationArtifact from "../artifacts/AssetTokenization.json";
import { AssetTokenization as AssetTokenizationType } from "./../../contract/typechain-types/contracts/Asset-Tokenization.sol/AssetTokenization";
import { getEthereum } from "../utils/ethereum";

export const AssetTokenizationAddress =
  "0x963308aa6aa48DF2Be72148A169DC75D718559fa";

type PropsUseContract = {
  currentAccount: string | undefined;
};

type ReturnUseContract = {
  assetTokenization: AssetTokenizationType | undefined;
};

const useContract = ({
  currentAccount,
}: PropsUseContract): ReturnUseContract => {
  const [assetTokenization, setAssetTokenization] =
    useState<AssetTokenizationType>();
  const ethereum = getEthereum();

  const getContract = useCallback(
    (
      contractAddress: string,
      abi: ethers.ContractInterface,
      storeContract: (_: ethers.Contract) => void
    ) => {
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }
      if (!currentAccount) {
        // if currentAccount is undefined, contract's object is undefined
        // Because not login user fail to call contract
        console.log("currentAccount doesn't exist!");
        return;
      }
      try {
        const provider = new ethers.providers.Web3Provider(
          ethereum as unknown as ethers.providers.ExternalProvider
        );
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, abi, signer);
        storeContract(Contract);
      } catch (error) {
        console.log(error);
      }
    },
    [ethereum, currentAccount]
  );

  useEffect(() => {
    getContract(
      AssetTokenizationAddress,
      AssetTokenizationArtifact.abi,
      (Contract: ethers.Contract) => {
        setAssetTokenization(Contract as AssetTokenizationType);
      }
    );
  }, [ethereum, currentAccount, getContract]);

  return {
    assetTokenization,
  };
};

export default useContract;
