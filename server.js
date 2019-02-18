var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));

server.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});

//===========
// GAME LOGIC
//===========
var players = {}, count = 0, enough, board;

io.on('connection', (socket) => {
  socket.on('new player', () => {
    players[socket.id] = {
      isFirst: count % 2 === 0 ? true : false
    };
    players[socket.id].isFirst ? generatePlayerOneBoard() : generatePlayerTwoBoard();
    io.sockets.emit('info', ready(players));
    socket.emit('is first', players[socket.id].isFirst);
    console.log('player connect');
  });

  socket.on('move', (rowFrom, colFrom, rowTo, colTo) => {
    board[rowFrom][colFrom] = '';
    board[rowTo][colTo] = players[socket.id].isFirst ? 'b' : 'r';
    console.log(rowFrom, colFrom, rowTo, colTo, socket.id);
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.sockets.emit('info', ready(players));
    console.log('player disconnect');
  });

  socket.on('reset', () => {
    generateBoard();
    if (count >= 1) generatePlayerOneBoard();
    if (count >= 2) generatePlayerTwoBoard();
    console.log('reset');
  });
});

// FUTURE TODO: allow more than two players
var ready = (players) => {
  count = Object.keys(players).length;
  enough = count < 2 ? false : true;
  return enough ? 'let play' : 'waiting for more players';
};

var generateBoard = () => {
  board = Array(8);
  for (let i = 0; i < board.length; i++) {
    board[i] = Array(8);
  }
  board.forEach(row => row.fill(''));
};

var generatePlayerOneBoard = () => {
  board[6].fill('bp');
  board[7].fill('b');
};

var generatePlayerTwoBoard = () => {
  board[0].fill('r');
  board[1].fill('rp');  
};

generateBoard();

setInterval(() => {
  io.sockets.emit('state', board);
}, 2000);