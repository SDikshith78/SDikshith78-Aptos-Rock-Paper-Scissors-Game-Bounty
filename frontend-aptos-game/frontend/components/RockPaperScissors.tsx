import React, { useState } from "react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

const RockPaperScissors: React.FC = () => {
  const [account, setAccount] = useState<{ address: string; publicKey: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

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

    try {
      const tx = {
        type: "entry_function_payload",
        function: "0x5e9be1a9afb2f2e101cd0ab9fe5846cda29755f5783134be34751c4981e153b1::rock_paper_scissors::play_game", // Replace with actual values
        arguments: [choice], // choice should be 'rock', 'paper', or 'scissors'
        type_arguments: [],
      };

      console.log("Transaction Object:", tx); // Verify the transaction object

      const petraWallet = new PetraWallet();
      const result = await petraWallet.signAndSubmitTransaction(tx);

      console.log(`Played ${choice} with account ${account.address}`);
      console.log("Game result:", result);
    } catch (err) {
      setError(`Failed to play game: ${err}`);
      console.error("Failed to play game:", err);
    }
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
