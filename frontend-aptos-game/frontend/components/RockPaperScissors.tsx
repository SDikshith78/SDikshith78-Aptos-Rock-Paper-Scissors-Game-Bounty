import React, { useState } from "react";
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";

const moduleAddress = "0x5e9be1a9afb2f2e101cd0ab9fe5846cda29755f5783134be34751c4981e153b1";
const moduleName = "RockPaperScissors";

const RockPaperScissors: React.FC = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [gameStarted, setGameStarted] = useState(false);
  const [playerMove, setPlayerMove] = useState<number | null>(null);
  const [computerMove, setComputerMove] = useState<number | null>(null);
  const [gameResult, setGameResult] = useState<string | null>(null);

  const handleStartGame = async () => {
    if (!connected || !account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const startGameTx: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::start_game`,
          functionArguments: [],
        },
      };

      console.log("Attempting to start the game with transaction:", startGameTx);

      const response = await signAndSubmitTransaction(startGameTx);
      console.log("Game started:", response);

      setGameStarted(true);
    } catch (err) {
      console.error("Failed to start the game:", err);
      alert("Failed to start the game. Check the console for details.");
    }
  };

  const handlePlayerMove = async (move: number) => {
    if (!connected || !account || !gameStarted) {
      alert("Please start the game first and ensure your wallet is connected.");
      return;
    }

    try {
      const playFunction: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::set_player_move`,
          functionArguments: [move.toString()],
        },
      };

      console.log("Attempting to set player move with transaction:", playFunction);

      const response = await signAndSubmitTransaction(playFunction);
      console.log("Player move set:", response);

      setPlayerMove(move);
    } catch (err) {
      console.error("Failed to set the player move:", err);
      alert("Failed to set your move. Check the console for details.");
    }
  };

  const handleComputermove = async () => {
    if (!connected || !account || !gameStarted) {
      alert("Please start the game first and ensure your wallet is connected.");
      return;
    }

    try {
      const computerMoveTx: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::randomly_set_computer_move`,
          functionArguments: [],
        },
      };

      console.log("Attempting to set computer move with transaction:", computerMoveTx);

      const response = await signAndSubmitTransaction(computerMoveTx);
      console.log("Computer move set:", response);

      // Optionally, you can implement fetching the computer move here
    } catch (err) {
      console.error("Failed to set the computer move:", err);
      alert("Failed to set computer move. Check the console for details.");
    }
  };

  const handleGetResult = async () => {
    if (!connected || !account || !gameStarted) {
      alert("Please start the game first and ensure your wallet is connected.");
      return;
    }

    try {
      // Set computer move before getting the result
      await handleComputermove();

      const getResultTx: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::finalize_game_results`,
          functionArguments: [],
        },
      };

      console.log("Attempting to get game result with transaction:", getResultTx);

      const response = await signAndSubmitTransaction(getResultTx);
      console.log("Game result response:", response);

      const result = response.success ? response.payload : null;

      if (result) {
        // Update the game result state based on your contract logic
        if (result === 2) {
          setGameResult("You won!");
        } else if (result === 1) {
          setGameResult("It's a draw!");
        } else {
          setGameResult("You lost!");
        }

        // Fetch computer move for displaying the result
        const computerMoveResponse = await fetchComputerMove();
        setComputerMove(computerMoveResponse);
      } else {
        setGameResult("Failed to retrieve game result.");
      }
    } catch (err) {
      console.error("Failed to get the game result:", err);
      alert("Failed to get the game result. Check the console for details.");
    }
  };

  const fetchComputerMove = async () => {
    // Implement this function to fetch computer move if necessary
    // For now, this is a placeholder
    return null;
  };

  return (
    <div className="rock-paper-scissors-game">
      <h1>Rock Paper Scissors</h1>

      {connected ? (
        <p>Connected: {account?.address}</p>
      ) : (
        <p>Please connect your wallet to start playing.</p>
      )}

      <button onClick={handleStartGame} disabled={!connected}>
        Start Game
      </button>

      {gameStarted && (
        <div className="game-options">
          <button onClick={() => handlePlayerMove(1)}>Rock</button>
          <button onClick={() => handlePlayerMove(2)}>Paper</button>
          <button onClick={() => handlePlayerMove(3)}>Scissors</button>
        </div>
      )}

      {playerMove !== null && (
        <p>Your move: {playerMove === 1 ? "Rock" : playerMove === 2 ? "Paper" : "Scissors"}</p>
      )}

      {gameStarted && (
        <button onClick={handleComputermove} disabled={!playerMove}>
          Set Computer Move
        </button>
      )}

      <button onClick={handleGetResult} disabled={!gameStarted}>
        Get Game Result
      </button>

      {gameResult && <p>Game Result: {gameResult}</p>}
    </div>
  );
};

export default RockPaperScissors;
