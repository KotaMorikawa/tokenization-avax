"use client";

import CurrentAccountContext from "@/context/CurrentAccountProvider";
import Link from "next/link";
import { ReactNode, useContext } from "react";

type Props = {
  children: ReactNode;
  home?: boolean;
};

const DefaultLayout = ({ children, home }: Props) => {
  const [currentAccount, connectWallet] = useContext(CurrentAccountContext);
  return (
    <div>
      <div className="h-20 flex justify-start items-center text-white px-6">
        <div className="flex">
          <div className="text-2xl font-semibold">Asset Tokenization</div>
        </div>
        {currentAccount === undefined ? (
          <div className="ml-auto">
            <div
              className="ml-4 bg-red-500 text-white rounded-md py-2 px-4 cursor-pointer"
              onClick={connectWallet}
            >
              Connect to wallet
            </div>
          </div>
        ) : (
          <div className="ml-auto">
            <div className="bg-gray-800 text-white rounded-md py-2 px-4">
              Connected to {currentAccount}
            </div>
          </div>
        )}
      </div>
      <div>{children}</div>
      {!home && (
        <Link href="/">
          <div className="fixed right-0 bottom-0 bg-gray-800 text-white rounded-md p-4 m-4 cursor-pointer">
            Back to home
          </div>
        </Link>
      )}
    </div>
  );
};

export default DefaultLayout;
