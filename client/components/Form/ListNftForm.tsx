"use client";

import CurrentAccountContext from "@/context/CurrentAccountProvider";
import useContract from "@/hooks/useContract";
import { avaxToWei, blockTimeToDate, weiToAvax } from "@/utils/formatter";
import { useCallback, useContext, useEffect, useState } from "react";
import ActionButton from "../Button/ActionButton";

type FarmNftDetailsType = {
  farmerAddress: string;
  farmerName: string;
  description: string;
  totalMint: string;
  availableMint: string;
  price: string;
  expirationDate: Date;
};

const ListNftForm = () => {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { assetTokenization } = useContract({ currentAccount });
  const [allNftDetails, setAllNftDetails] = useState<FarmNftDetailsType[]>([]);

  const onClickBuyNft = async (farmerAddress: string, priceInAvax: string) => {
    if (!currentAccount) {
      alert("connect wallet!");
      return;
    }
    if (!assetTokenization) return;
    try {
      const priceInWei = avaxToWei(priceInAvax);

      const txn = await assetTokenization.buyNft(farmerAddress, {
        value: priceInWei,
      });
      await txn.wait();
      alert("Success");
    } catch (error) {
      alert(error);
    }
  };

  const NftDetailsCard = ({ details }: { details: FarmNftDetailsType }) => {
    return (
      <div className="w-fit border-solid border rounded-3xl m-3 p-3 bg-black">
        <p>farmer address: {details.farmerAddress}</p>
        <p>farmer name: {details.farmerName}</p>
        <p>description: {details.description}</p>
        <p>total mint: {details.totalMint}</p>
        <p>availableMint: {details.availableMint}</p>
        <p>price: {details.price}</p>
        <p>expiration date: {details.expirationDate.toString()}</p>
        <div className="flex justify-center p-2">
          <ActionButton
            title="Buy NFT"
            onClick={() => onClickBuyNft(details.farmerAddress, details.price)}
            disable={details.availableMint === "0"}
          />
        </div>
      </div>
    );
  };

  const getAllNftDetails = useCallback(async () => {
    if (!currentAccount) {
      alert("connect wallet!");
      return;
    }
    if (!assetTokenization) return;
    const farmers = await assetTokenization.getFarmers();
    const allDetails: FarmNftDetailsType[] = [];
    for (let i = 0; i < farmers.length; i++) {
      const available = await assetTokenization.availableContract(farmers[i]);
      if (available) {
        const details = await assetTokenization.getNftContractDetails(
          farmers[i]
        );
        allDetails.push({
          farmerAddress: details.farmerAddress,
          farmerName: details.farmerName,
          description: details.description,
          totalMint: details.totalMint.toString(),
          availableMint: details.availableMint.toString(),
          price: weiToAvax(details.price),
          expirationDate: blockTimeToDate(details.expirationDate),
        } as FarmNftDetailsType);
      }
    }
    setAllNftDetails(allDetails);
  }, [currentAccount, assetTokenization]);

  useEffect(() => {
    getAllNftDetails();
  }, [getAllNftDetails]);

  return (
    <div>
      <p className="flex justify-center">Available NFT</p>
      {allNftDetails.map((details, index) => {
        return (
          <div key={index} className="flex justify-center">
            <NftDetailsCard details={details} />
          </div>
        );
      })}
    </div>
  );
};

export default ListNftForm;
