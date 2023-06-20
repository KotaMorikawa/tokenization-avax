"use client";

import useWallet from "@/hooks/useWallet";
import React from "react";
import { createContext, ReactNode } from "react";

const CurrentAccountContext = createContext<
  [string | undefined, boolean, () => void]
>(["", true, () => {}]);

export const CurrentAccountProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { isLoading, currentAccount, connectWallet } = useWallet();

  return (
    <CurrentAccountContext.Provider
      value={[currentAccount, isLoading, connectWallet]}
    >
      {children}
    </CurrentAccountContext.Provider>
  );
};

export default CurrentAccountContext;
