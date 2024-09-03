import React from 'react';
import RockPaperScissors from './components/RockPaperScissors';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const App: React.FC = () => {
  return (
    <div>
      <h1>Rock-Paper-Scissors Game</h1>
      <WalletSelector />
      <RockPaperScissors />
    </div>
  );
};

export default App;
