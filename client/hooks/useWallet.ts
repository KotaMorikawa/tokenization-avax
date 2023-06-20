"use client";

import { getEthereum } from "@/utils/ethereum";
import { useCallback, useEffect, useState } from "react";

type ReturnWallet = {
  currentAccount: string | undefined;
  isLoading: boolean;
  connectWallet: () => void;
};

const useWallet = (): ReturnWallet => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentAccount, setCurrentAccount] = useState<string>();
  const ethereum = getEthereum();

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get Wallet!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!Array.isArray(accounts)) {
        return;
      }
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!ethereum) {
        console.log("Make sure you have Wallet!");

        return;
      } else {
        console.log("We have the ethereum object", ethereum);
        setIsLoading(false);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (!Array.isArray(accounts)) {
        return;
      }
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      }
    } catch (error) {
      console.log(error);
    }
  }, [ethereum]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return {
    isLoading,
    currentAccount,
    connectWallet,
  };
};

export default useWallet;
