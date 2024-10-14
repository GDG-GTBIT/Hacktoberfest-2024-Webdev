import React from 'react';
import { GameProvider } from './context/GameContext';
import Dice from './components/Dice';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Dice Rolling Game</h1>
        <Dice />
      </div>
    </GameProvider>
  );
}

export default App;