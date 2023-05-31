import useWallet from "@/hooks/useWallet";
import { createContext, ReactNode } from "react";

const CurrentAccountContext = createContext<[string | undefined, () => void]>([
  "",
  () => {},
]);

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
