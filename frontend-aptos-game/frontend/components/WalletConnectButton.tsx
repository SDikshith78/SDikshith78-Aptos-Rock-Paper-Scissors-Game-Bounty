import React, { useState } from 'react';
import { PetraWallet } from 'petra-plugin-wallet-adapter'; // Ensure correct import

const WalletConnectButton: React.FC = () => {
  const [account, setAccount] = useState<{ address: string; publicKey: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      // Create a new instance of PetraWallet
      const petraWallet = new PetraWallet();

      // Connect to the wallet
      await petraWallet.connect();

      // Call the account method to get account details
      const accountInfo = await petraWallet.account(); // Adjust if needed
      setAccount(accountInfo); // Set the account information in state

      console.log('Connected to Petra Wallet:', accountInfo);

    } catch (err) {
      setError(`Failed to connect to Petra Wallet: ${err}`);
      console.error('Failed to connect to Petra Wallet:', err);
    }
  };

  return (
    <div>
      <button onClick={handleConnect}>
        Connect to Petra Wallet
      </button>
      {account && (
        <div>
          <p><strong>Connected Account:</strong></p>
          <p><strong>Address:</strong> {account.address}</p>
          <p><strong>Public Key:</strong> {account.publicKey}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default WalletConnectButton;
