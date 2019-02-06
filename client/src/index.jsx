import React from 'react';
import ReactDOM from 'react-dom';

var socket = io();  

import Board from './components/Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      isFirst: null,
      select: false
    };

    this.selectTile = this.selectTile.bind(this);
  }

  componentDidMount() {
    socket.emit('new player');
    socket.on('info', (conn) => {
      console.log(conn);
    });
    socket.on('is first', (isFirst) => {
      console.log(isFirst ? 'you are first player' : 'you are second player');
      this.setState({
        isFirst: isFirst
      });
    });
    socket.on('state', (state) => {
      // console.log('receive state', state);
      this.setState({
        board: state
      });
    });
    // REFACTOR TO REQUEST BOARD FROM SERVER
    var board = Array(8);
    for (let i = 0; i < board.length; i++) {
      board[i] = Array(8);
    }
    board.forEach(row => row.fill(''));
    this.setState({
      board: board
    });
  }

  selectTile(e) {
    var node = e.target;
    if (node.nodeName !== 'DIV') {
      while (node.nodeName !== 'DIV') {
        node = node.parentNode;
      }
    }
    var row = node.dataset.row;
    var col = node.dataset.col;
    socket.emit('move', row, col);
    var classes = Array.prototype.slice.call(node.classList);
    var selectColor = this.state.isFirst ? 'cyan' : 'pink';
    if (classes.includes(selectColor)) {
      this.setState({ select: false });
      node.classList.remove(selectColor);
    } else {
      this.setState({ select: true });
      node.classList.add(selectColor);      
    }
  }

  reset() {
    socket.emit('reset');
  }

  render() {
  	return (
  		<div className='fullHeight'>
  			<Board 
          board={this.state.board}
          selectTile={this.selectTile}
        />
        <button onClick={this.reset}>RESET</button>
  		</div>
  	);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));