import React from 'react';
import { useGameContext } from '../context/GameContext';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const Dice: React.FC = () => {
  const { diceValue, rollDice } = useGameContext();

  const getDiceIcon = () => {
    switch (diceValue) {
      case 1: return <Dice1 size={64} />;
      case 2: return <Dice2 size={64} />;
      case 3: return <Dice3 size={64} />;
      case 4: return <Dice4 size={64} />;
      case 5: return <Dice5 size={64} />;
      case 6: return <Dice6 size={64} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">{getDiceIcon()}</div>
      <button
        onClick={rollDice}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Roll Dice
      </button>
    </div>
  );
};

export default Dice;