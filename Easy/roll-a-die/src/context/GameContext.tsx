import React, { createContext, useContext, useState } from 'react';

interface GameContextType {
  diceValue: number;
  rollDice: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);
  };

  return (
    <GameContext.Provider value={{ diceValue, rollDice }}>
      {children}
    </GameContext.Provider>
  );
};