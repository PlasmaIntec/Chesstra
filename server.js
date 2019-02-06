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
    console.log('player connect');
  });

  socket.on('move', (row, col) => {
    board[row][col] = players[socket.id].isFirst ? 5 : 6;
    console.log(row, col, socket.id);
  });

  socket.on('disconnect', () => {
    console.log('player disconnect');
    delete players[socket.id];
    io.sockets.emit('info', ready(players));
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
  board[6].fill(5);
  board[7].fill(5);
};

var generatePlayerTwoBoard = () => {
  board[0].fill(6);
  board[1].fill(6);  
};

generateBoard();

setInterval(() => {
  io.sockets.emit('state', board);
}, 2000);