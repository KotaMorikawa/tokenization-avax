"use client";

import CurrentAccountContext from "@/context/CurrentAccountProvider";
import useContract from "@/hooks/useContract";
import { avaxToWei } from "@/utils/formatter";
import { validAmount } from "@/utils/validAmount";
import { useContext, useState } from "react";
import ActionButton from "../Button/ActionButton";

const TokenizeForm = () => {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { assetTokenization } = useContract({ currentAccount });

  const [farmerName, setFarmerName] = useState("");
  const [description, setDescription] = useState("");
  const [totalMint, setTotalMint] = useState("");
  const [price, setPrice] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const validInput = () => {
    if (farmerName === "") {
      alert("enter farmer name");
      return false;
    }
    if (description === "") {
      alert("enter description name");
      return false;
    }
    if (!validAmount(totalMint)) {
      alert("invalid total number of mint");
      return false;
    }
    if (!validAmount(price)) {
      alert("invalid price");
      return false;
    }
    if (expirationDate === "") {
      alert("invalid expiration date");
      return false;
    }
    return true;
  };

  const dateToSecond = (date: string) => {
    const dateInDate = new Date(date);
    const dateInSeconds = Math.floor(dateInDate.getTime() / 1000);
    return dateInSeconds.toString();
  };

  const onClickGenerateNFT = async () => {
    if (!currentAccount) {
      alert("connect wallet!");
      return;
    }
    if (!assetTokenization) return;
    if (!validInput) return;
    try {
      const priceInWei = avaxToWei(price);
      const dateInSeconds = dateToSecond(expirationDate);

      const txn = await assetTokenization.generateNftContract(
        farmerName,
        description,
        totalMint,
        priceInWei,
        dateInSeconds
      );
      await txn.wait();

      setFarmerName("");
      setDescription("");
      setTotalMint("");
      setPrice("");
      setExpirationDate("");

      alert("Success");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-8">
      <div className="pb-5">
        <p>Farmer name:</p>
        <input
          className="w-1/2 h-9 rounded-md border border-gray-300"
          type="text"
          onChange={(e) => setFarmerName(e.target.value)}
        />
      </div>

      <div className="pb-5">
        <p>description:</p>
        <textarea
          className="w-3/4 h-32 rounded-md border border-gray-300 resize-none"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="pb-5">
        <p>total number of mint:</p>
        <input
          className="w-1/2 h-9 rounded-md border border-gray-300"
          type="number"
          value={totalMint}
          onChange={(e) => setTotalMint(e.target.value)}
        />
      </div>

      <div className="pb-5">
        <p>price:</p>
        <input
          className="w-1/2 h-9 rounded-md border border-gray-300"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="pb-5">
        <p>expiration date:</p>
        <input
          className="w-1/5 h-9 rounded-md border border-gray-300"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </div>

      <div className="pt-10">
        <ActionButton
          title="Generate NFT"
          onClick={() => onClickGenerateNFT()}
          disable={false}
        />
      </div>
    </div>
  );
};

export default TokenizeForm;
