"use client";

import useWallet from "@/hooks/useWallet";
import React from "react";
import { createContext, ReactNode } from "react";

const CurrentAccountContext = React.createContext<
  [string | undefined, () => void]
>(["", () => {}]);

export const CurrentAccountProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { currentAccount, connectWallet } = useWallet();

  return (
    <CurrentAccountContext.Provider value={[currentAccount, connectWallet]}>
      {children}
    </CurrentAccountContext.Provider>
  );
};

export default CurrentAccountContext;
