import React, { useState, createContext, useContext } from "react";
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { aptos } from "@/utils/aptosClient";
import { Tilt } from 'react-tilt'
import {Player} from "@lottiefiles/react-lottie-player"
import WinLottie from "../../public/lottie/win.json";
import LoseLottie from "../../public/lottie/lose.json";
import DrawLottie from "../../public/lottie/draw.json";
import "./game.css"

const GameContext = createContext({
  score: { player: 0, computer: 0 },
  incrementPlayerScore: () => {},
  incrementComputerScore: () => {},
  resetScore: () => {},
});

const moduleAddress = "0x5e9be1a9afb2f2e101cd0ab9fe5846cda29755f5783134be34751c4981e153b1";
const moduleName = "RockPaperScissors";

const moveNames = {
  1: "Rock",
  2: "Paper",
  3: "Scissors"
};

const resultMessages = {
  1: "It's a Draw!",
  2: "You Win!",
  3: "Computer Wins!"
};

const RockPaperScissors: React.FC = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [gameStarted, setGameStarted] = useState(false);
  const [playerMove, setPlayerMove] = useState<number | null>(null);
  const [computerMove, setComputerMove] = useState<number | null>(null);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { score, incrementPlayerScore, incrementComputerScore, resetScore } = useContext(GameContext);

  const handleStartGame = async () => {
    if (!connected || !account) {
      setErrorMessage("Please connect your wallet first.");
      return;
    }

    try {
      const startGameTx: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::start_game`,
          functionArguments: [],
        },
      };

      const response = await signAndSubmitTransaction(startGameTx);
      // console.log("Game started:", response);

      setGameStarted(true);
      setErrorMessage(null); 
    } catch (err) {
      // console.error("Failed to start the game:", err);
      setErrorMessage("Failed to start the game. Check the console for details.");
    }
  };

  const handlePlayerMove = async (move: number) => {
    if (!connected || !account || !gameStarted) {
      setErrorMessage("Please start the game first and ensure your wallet is connected.");
      return;
    }

    try {
      const playFunction: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::set_player_move`,
          functionArguments: [move.toString()],
        },
      };

      const response = await signAndSubmitTransaction(playFunction);
      // console.log("Player move set:", response);

      setPlayerMove(move);
      setErrorMessage(null); // Clear any existing error
    } catch (err) {
      // console.error("Failed to set the player move:", err);
      setErrorMessage("Failed to set your move. Check the console for details.");
    }
  };

  const handleComputermove = async () => {
    if (!connected || !account || !gameStarted) {
      setErrorMessage("Please start the game first and ensure your wallet is connected.");
      return;
    }

    try {
      const computerMoveTx: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::randomly_set_computer_move`,
          functionArguments: [],
        },
      };

      const response = await signAndSubmitTransaction(computerMoveTx);
      // console.log("Computer move set:", response);

      setErrorMessage(null); // Clear any existing error
    } catch (err) {
      // console.error("Failed to set the computer move:", err);
      setErrorMessage("Failed to set computer move. Check the console for details.");
    }
  };

  const handleGetResult = async () => {
    if (!connected || !account || !gameStarted) {
      setErrorMessage("Please start the game first and ensure your wallet is connected.");
      return;
    }

    try {
      const getResultTx: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::finalize_game_results`,
          functionArguments: [],
        },
      };

      await signAndSubmitTransaction(getResultTx);
      await fetchGameResult();
    } catch (err) {
      // console.error("Failed to get the game result:", err);
      setErrorMessage("Failed to get game result. Check the console for details.");
    }
  };

  const fetchGameResult = async () => {
    if (!account) return;
    try {
      const getResult = await aptos.getAccountResource({
        accountAddress: account?.address,
        resourceType: `${moduleAddress}::${moduleName}::Game`,
      });

      setComputerMove(getResult?.computer_move);
      const result = getResult?.result;
      setGameResult(resultMessages[result] || "Unknown result");

      if (result === 2) incrementPlayerScore();
      if (result === 3) incrementComputerScore();

      // console.log(getResult);
    } catch (e: any) {
      // console.log(e);
      setErrorMessage("Error fetching game result. Check the console for details.");
    }
  };

  const handlePlayAgain = () => {
    setPlayerMove(null);
    setComputerMove(null);
    setGameResult(null);
    setErrorMessage(null);
  };

  const handleResetGame = () => {
    handlePlayAgain();
    resetScore(); // Reset scores
    setGameStarted(false); // Reset game state
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans">
      <h1 className="rainbow-text text-5xl font-bold mb-5 mt-1 text-center mt-[5%]">Rock Paper Scissors</h1>

      {/* Wallet Address */}
      {connected ? (
        <p className="text-center bg-gray-900 py-2 px-4 rounded-lg shadow-md mb-6">
          Connected Wallet: {account?.address}
        </p>
      ) : (
        <p className="text-center text-red-500 ">Please connect your wallet to start playing.</p>
      )}

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {/* Game Start Button */}
      {!gameStarted ? (
        <button
          onClick={handleStartGame}
          className="start_btn bg-green-600 hover:bg-green-500 py-3 px-6 rounded-full font-bold mb-6 shadow-lg"
          disabled={!connected}
        >
          Start Game
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-10 w-full max-w-4xl">
          {/* Player Move Card */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Your Move</h2>
            <div className="flex justify-center space-x-4">
              <Tilt>
              <button
                onClick={() => handlePlayerMove(1)}
                className={`px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 ${
                  playerMove === 1 ? "ring ring-blue-300" : ""
                }`}
              >
                Rock
              </button>
              </Tilt>
              <Tilt>
              
              <button
                onClick={() => handlePlayerMove(2)}
                className={`px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 ${
                  playerMove === 2 ? "ring ring-blue-300" : ""
                }`}
              >
                Paper
              </button>
              </Tilt>
              <Tilt>

              <button
                onClick={() => handlePlayerMove(3)}
                className={`px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 ${
                  playerMove === 3 ? "ring ring-blue-300" : ""
                }`}
              >
                Scissors
              </button>
              </Tilt>

            </div>
            {playerMove && (
              <p className="mt-4 text-lg">You selected: {moveNames[playerMove]}</p>
            )}
          </div>
          

          {/* Computer Move Card */}
          
          <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Computer's Move</h2>
            <Tilt>
            <button
              onClick={handleComputermove}
              className="bg-orange-600 hover:bg-orange-500 py-3 px-6 rounded-lg font-bold shadow-lg mb-4"
            >
              Generate Computer Move
            </button>
            </Tilt>
            {computerMove && (
              <p className="mt-4 text-lg">Computer selected: {moveNames[computerMove]}</p>
            )}
          </div>
        </div>
      )}

      {/* Always show the "Get Results" button after moves */}
      {gameStarted && (
        <div className="mt-6">
        <button
          onClick={handleGetResult}
          className="result_effect rounded-full"
        >
          <div>
            <span>Get Results</span>
            <span>Get Results</span>
          </div>
        </button>
      </div>
      )}

      {/* Game Result */}
      {gameResult && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">{gameResult}</h2><div className="lottie-animation">
            {gameResult === resultMessages[2] && (
              <Player className="lottiefiles" autoplay loop src={WinLottie} style={{ height: '500px', width: '500px' }} />
            )}
            {gameResult === resultMessages[3] && (
              <Player className="lottiefiles" autoplay loop src={LoseLottie} style={{ height: '500px', width: '500px' }} />
            )}
            {gameResult === resultMessages[1] && (
              <Player className="lottiefiles" autoplay loop src={DrawLottie} style={{ height: '500px', width: '500px' }} />
            )}
          </div>
        </div>
      )}

      {/* Score Card */}

      <Tilt>
      <div className="mt-6 bg-[#e5b9a8] p-6 rounded-lg shadow-md text-center text-black">
      <h2 className="text-xl font-semibold mb-4">Score Card</h2>
      <p className="text-lg">Player: {score.player}</p>
      <p className="text-lg">Computer: {score.computer}</p>
      </div>
      </Tilt>

      {/* Play Again and Reset Buttons */}
      <div className="mt-6 space-x-4">
        <button
          onClick={handlePlayAgain}
          className="play_rest bg-yellow-400 hover:bg-yellow-300 py-3 px-6 rounded-full font-bold shadow-lg mb-6 text-black"
        >
          Play Again
        </button>
        <button
          onClick={handleResetGame}
          className="play_rest bg-red-600 hover:bg-red-500 py-3 px-6 rounded-full font-bold shadow-lg mb-6"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

// Create a GameProvider to wrap around the App
const GameProvider: React.FC = ({ children }) => {
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const incrementPlayerScore = () => {
    setScore(prevScore => ({ ...prevScore, player: prevScore.player + 1 }));
  };

  const incrementComputerScore = () => {
    setScore(prevScore => ({ ...prevScore, computer: prevScore.computer + 1 }));
  };

  const resetScore = () => {
    setScore({ player: 0, computer: 0 });
  };

  return (
    <GameContext.Provider value={{ score, incrementPlayerScore, incrementComputerScore, resetScore }}>
      {children}
    </GameContext.Provider>
  );
};

export { RockPaperScissors, GameProvider };
