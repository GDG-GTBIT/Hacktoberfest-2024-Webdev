import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let currentPlayerIndex = 0;
const players = [];

io.on('connection', (socket) => {
  console.log('A player connected:', socket.id);
  
  // Add new player to the list
  players.push(socket.id);
  
  socket.on('diceRolled', (data) => {
    io.emit('diceRolled', data); // Emit dice roll to all players
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Update turn
  });

  socket.on('declareWinner', ({ playerId }) => {
    io.emit('winnerDeclared', { playerId });
    players.length = 0; // Reset players for new game
    currentPlayerIndex = 0; // Reset turn index
  });

  socket.on('resetGame', () => {
    io.emit('gameReset'); // Reset game for all players
    players.length = 0; // Reset players for new game
    currentPlayerIndex = 0; // Reset turn index
  });
});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
