import React, { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

function App() {
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [isWinner, setIsWinner] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [bestScore, setBestScore] = useState(Infinity);

  useEffect(() => {
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  const rollDice = () => {
    const newDiceValues = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10) + 1);
    setDiceValues(newDiceValues);
    setRollCount(prevCount => prevCount + 1);
    const newIsWinner = newDiceValues.every(value => value === newDiceValues[0]);
    setIsWinner(newIsWinner);

    if (newIsWinner && rollCount + 1 < bestScore) {
      const newBestScore = rollCount + 1;
      setBestScore(newBestScore);
      localStorage.setItem('bestScore', newBestScore.toString());
    }
  };

  const resetGame = () => {
    setDiceValues([]);
    setIsWinner(false);
    setRollCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold mb-10 text-blue-800 drop-shadow-lg text-center">6 Dice Game (1-10)</h1>
      <div className="grid grid-cols-3 gap-6 mb-10">
        {diceValues.map((value, index) => {
          const DiceIcon = diceIcons[Math.min(value - 1, 5)];
          return (
            <div key={index} className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-5 rounded-xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
              style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
              <DiceIcon size={48} className="text-blue-600 drop-shadow-md" />
              <span className="ml-3 text-3xl font-semibold text-gray-800">{value}</span>
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
    </div>
  );
}

export default App;