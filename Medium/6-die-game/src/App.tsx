import React, { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the server

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

function App() {
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [isWinner, setIsWinner] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [bestScore, setBestScore] = useState(Infinity);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [playerId] = useState(Math.random().toString(36).substr(2, 9)); // Unique ID for each player
  const [randomThreshold] = useState(Math.floor(Math.random() * 50) + 1); // Random threshold between 50-100

  useEffect(() => {
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }

    socket.on('diceRolled', ({ diceValues, playerId }) => {
      setDiceValues(diceValues);
      checkForWinner(diceValues); // Check for a winner whenever dice are rolled
      setCurrentPlayerId(playerId); // Update the current player
    });

    socket.on('winnerDeclared', ({ playerId }) => {
      setIsWinner(true);
      alert(`Winner declared: ${playerId}`);
    });

    socket.on('gameReset', resetGame);

    // Clean up the socket connection on unmount
    return () => {
      socket.off('diceRolled');
      socket.off('winnerDeclared');
      socket.off('gameReset');
    };
  }, []);

  const rollDice = () => {
    if (isWinner) return; // Prevent rolling if there's a winner

    let newDiceValues;

    if (rollCount >= randomThreshold) {
      // After reaching a random threshold, set all dice to the same last rolled value
      newDiceValues = Array(6).fill(diceValues[diceValues.length - 1]);
    } else {
      newDiceValues = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10) + 1);
    }

    setDiceValues(newDiceValues);
    const newRollCount = rollCount + 1; // Increment roll count here
    setRollCount(newRollCount); // Update roll count state
    socket.emit('diceRolled', { diceValues: newDiceValues, playerId }); // Send the roll to the server
    checkForWinner(newDiceValues); // Check if the current roll is a winner
  };

  const checkForWinner = (newDiceValues: number[]) => {
    const newIsWinner = newDiceValues.every(value => value === newDiceValues[0]);
    setIsWinner(newIsWinner);

    if (newIsWinner && rollCount < bestScore) {
      const newBestScore = rollCount + 1;
      setBestScore(newBestScore);
      localStorage.setItem('bestScore', newBestScore.toString());
      socket.emit('declareWinner', { playerId }); // Emit winner declaration to server
    }
  };

  const resetGame = () => {
    setDiceValues([]);
    setIsWinner(false);
    setRollCount(0);
    socket.emit('resetGame');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">6 Dice Game (1-10)</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {diceValues.map((value, index) => {
          const DiceIcon = diceIcons[Math.min(value - 1, 5)];
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
              <DiceIcon size={48} className="text-blue-600" />
              <span className="ml-2 text-2xl font-bold">{value}</span>
            </div>
          );
        })}
      </div>
      <button
        onClick={rollDice}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        {diceValues.length === 0 ? 'Start Game' : 'Roll Dice'}
      </button>
      {diceValues.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-2xl font-semibold mb-2">
            {isWinner ? (
              <span className="text-green-600">Congratulations! You won in {rollCount} rolls!</span>
            ) : (
              <span className="text-red-600">Try again! (Roll count: {rollCount})</span>
            )}
          </p>
          <p className="text-xl">Best score: {bestScore === Infinity ? 'N/A' : bestScore} rolls</p>
          {isWinner && (
            <button
              onClick={resetGame}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Play Again
            </button>
          )}
        </div>
      )}
      <p className="mt-4 text-lg">Current Player: {currentPlayerId}</p>
    </div>
  );
}

export default App;
