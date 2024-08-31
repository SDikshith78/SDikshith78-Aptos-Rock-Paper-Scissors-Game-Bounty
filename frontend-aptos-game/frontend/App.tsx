import React from 'react';
import WalletConnectButton from './components/WalletConnectButton'; 
import RockPaperScissors from './components/RockPaperScissors';

const App: React.FC = () => {
  return (
    <div>
      <h1>Rock-Paper-Scissors Game</h1>
      <WalletConnectButton />
      <RockPaperScissors />
      {/* Other components or elements */}
    </div>
  );
};

export default App;
