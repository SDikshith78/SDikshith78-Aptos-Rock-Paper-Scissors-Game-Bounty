import React, { useState, useEffect } from 'react';
import { RockPaperScissors, GameProvider } from './components/RockPaperScissors';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import LoadingScreen from '../frontend/components/LoadingScreen'; // Adjust the import path as needed

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set timeout for loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the time as needed

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <GameProvider>
      <div className='relative'>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <div className='absolute flex justify-center mt-5 align-center ml-[46%]'>
              <WalletSelector />
            </div>
            <RockPaperScissors />
          </>
        )}
      </div>
    </GameProvider>
  );
};

export default App;
