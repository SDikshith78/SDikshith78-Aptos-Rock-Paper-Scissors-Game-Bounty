-----------------------------------   Aptos-related project ---------------------------------------

-----------------------------------   Bounty - Level Up Your Rock Paper Scissors Game with Aptos ---------------------------------------

Video Demo link: Click to see
https://github.com/user-attachments/assets/a5ef0e79-291f-40df-9018-c78f23bd83cd

  ------------------------------------------------------------------ PROJECT OVERVIEW -------------------------------------------------------
  
As demonstrated in the Move on Aptos III Quest-3, we developed a Rock Paper Scissors game using the Move programming language. The game logic is defined within the smart contract, handling player moves, generating random computer moves, and determining the game outcome (win/lose/draw). This contract was deployed on the Aptos Testnet. Additionally, we implemented the Aptos Randomness API for generating random computer moves.

Bounty Project Overview: This project extends the on-chain game logic from the .move file and showcases it in the frontend UI using React and TypeScript. The front-end provides an interactive gameplay experience while maintaining blockchain integration for transactions and results.

----------- Technologies Used ---------------
Frontend:
* React.js: The front-end is built using React for dynamic UI updates by using aptos boilerplater to install -> create-aptos-dapp.
* TypeScript: Provides type safety and helps catch potential errors at compile time. the boilerplater uses .tsx file format.
* Vite: Fast build tool for frontend development.
* Tilt.js: For adding tilt effects to UI elements.
* Lottie.js: For animating the win, lose, and draw outcomes in the game.
  
UI & Styling
* Tailwind CSS: Used for fast, and modern styling of the components.
* Custom CSS: Additional styles to refine the look and feel of the game interface and also used to create animations in it. Like when you hover to buttons they will animate and each button has different effects.

Issues We Faced & Solved
* Wallet Integration Errors: We encountered a "Network not supported" error while connecting to the Aptos wallet. This was due to an SDK version mismatch. We solved it by downgrading @aptos-labs/ts-sdk to a compatible version and reconfiguring the wallet setup.
* Export Issues in Wallet Plugin:The integration with petra-plugin-wallet-adapter had export-related issues. By analyzing the module exports and adjusting the import strategies, we successfully integrated the wallet plugin.
* Other Errors: Challenges with the Randomness API, module addresses,node modules and Generic Errors were resolved by using @aptos-labs/wallet-adapter-react and utilizing aptos and aptos-labs/ts-sdk. We also created an aptosClient.ts file in the utils folder to fetch data from the blockchain.

Note: 
* Transaction/Network Fees: One of the most challenging aspects was managing transactions with wallet integration, ensuring fees were correctly handled for actions like choosing moves, generating computer moves, and getting results.
* State Management: For the score tracking and game logic, we used useContext instead of Redux. Since the game plays against the computer locally, useContext was a simpler solution for managing the game's state.

Features:
* Connect Wallet: Players must connect their Petra wallet to start the game. Without it, the game cannot begin.
* Loading Screen: To look more intresting and be in game zone i have added loading screen which looks fun.
* Rock-Paper-Scissors Gameplay: Players can choose Rock, Paper, or Scissors and compete against the computer (Note: the computer is highly competitive!).
* Blockchain Integration: Game logic is executed directly on the Aptos blockchain. We imported the .move file functionality into RockPaperScissors.tsx and used it to interact with the blockchain.
* Wallet Integration: Players can connect and disconnect their Aptos wallets, with all gameplay transactions (like choosing a move, generating a computer move, and fetching results) handled via blockchain transactions. Each action requires a transaction fee.
* Scoreboard: Tracks player and computer scores to see who’s winning.
* Play Again: Players can replay the game without any issues, and the score will continue to update.
* Reset Game: Players can reset the game at any point, which will clear all data and start fresh.
* Lottie Animations: Win, lose, and draw outcomes are animated using Lottie, adding visual excitement to the gameplay.
* Tilt.js: Adds tilt effects to the player and computer move cards, making the UI more engaging.

Conclusion:
This Dapp is an exciting demonstration of what can be built on the Aptos blockchain. By integrating blockchain technology with modern front-end tools like React, TypeScript, and Lottie.js, we’ve created an immersive and interactive game. Despite being a simple Rock-Paper-Scissors game, the combination of blockchain integration, wallet transactions, and animations makes it a fun and engaging experience, showcasing the potential of decentralized gaming.
