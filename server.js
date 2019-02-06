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

var players = {}, count, enough, board;
board = Array(8);
for (let i = 0; i < board.length; i++) {
  board[i] = Array(8);
}
board.forEach(row => row.fill(1));
io.on('connection', (socket) => {
  socket.on('new player', () => {
    players[socket.id] = {
      info: socket
    };
    io.sockets.emit('mess', ready(players));
  });

  socket.on('move', (row, col) => {
    board[row][col] = Object.keys(players).indexOf(socket.id) % 2 === 0 ? 5 : 6;
    console.log(row, col, socket.id);
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.sockets.emit('mess', ready(players));
  });
});

var ready = (players) => {
  count = Object.keys(players).length;
  enough = count < 2 ? false : true;
  return enough ? 'let play' : 'waiting for more players';
};

setInterval(() => {
  io.sockets.emit('state', board);
}, 1000);