import React, { useState } from 'react';
import { AptosClient, TxnBuilderTypes, BCS } from 'aptos';

// Initialize Aptos Client
const client = new AptosClient('https://api.testnet.aptoslabs.com/'); // Use the appropriate endpoint for your network

const ContractInteraction: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);

  const sendTransaction = async () => {
    try {
      const accountAddress = '0x223d508f051f5869e232658de4a25c493813273319b5130ae54838c609be630d'; // Replace with your actual account address
      const functionId = '0x5e9be1a9afb2f2e101cd0ab9fe5846cda29755f5783134be34751c4981e153b1::YourModule::your_function'; // Replace with your contract function path

      // Prepare payload
      const payload = {
        type: 'script_function_payload',
        function: functionId,
        type_arguments: [],
        arguments: [], // Add arguments if needed
      };

      // Submit transaction
      const txn = await client.submitTransaction({
        sender: accountAddress,
        payload,
      });

      // Wait for transaction to be confirmed
      await client.waitForTransaction(txn.hash);
      setResult(`Transaction Sent: ${txn.hash}`);
    } catch (error) {
      console.error('Transaction Failed:', error);
      setResult('Transaction Failed');
    }
  };

  return (
    <div>
      <button onClick={sendTransaction} className="p-2 bg-blue-500 text-white rounded">
        Send Transaction
      </button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default ContractInteraction;
