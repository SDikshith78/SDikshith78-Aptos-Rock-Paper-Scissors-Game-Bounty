import React, { useState } from "react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-core";
import { useWallet } from "@aptos-labs/wallet-adapter-react";


const moduleAddress = "0x5e9be1a9afb2f2e101cd0ab9fe5846cda29755f5783134be34751c4981e153b1"
const moduleName = "RockPaperScissors"

const RockPaperScissors: React.FC = () => {
  const [account, setAccount] = useState<{ address: string; publicKey: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {signAndSubmitTransaction}  = useWallet()

  const handleConnect = async () => {
    try {
      const petraWallet = new PetraWallet();
      await petraWallet.connect();
      const accountInfo = await petraWallet.account();
      setAccount(accountInfo);
      console.log("Connected to Petra Wallet:", accountInfo);
    } catch (err) {
      setError(`Failed to connect to Petra Wallet: ${err}`);
      console.error("Failed to connect to Petra Wallet:", err);
    }
  };

  const handlePlay = async (choice: string) => {
    if (!account) {
      setError("Please connect to the wallet first.");
      return;
    }

    // try {
      const tx: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::start_game`,
          functionArguments: [],
        },
      };
      const response = await signAndSubmitTransaction(tx);
      console.log(response);

      console.log("Transaction Object:", tx); // Verify the transaction object

      // const petraWallet = new PetraWallet();
      // const result = await petraWallet.signAndSubmitTransaction(tx);

      console.log(`Played ${choice} with account ${account.address}`);
      console.log("Game result:", response);
    // } 
    // catch (err) {
      // setError(`Failed to play game: ${err}`);
      // console.error("Failed to play game:", err);
    // }
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect to Petra Wallet</button>
      {account && (
        <div>
          <p><strong>Connected Account:</strong> {account.address}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <button onClick={() => handlePlay("rock")}>Play Rock</button>
      <button onClick={() => handlePlay("paper")}>Play Paper</button>
      <button onClick={() => handlePlay("scissors")}>Play Scissors</button>
    </div>
  );
};

export default RockPaperScissors;
