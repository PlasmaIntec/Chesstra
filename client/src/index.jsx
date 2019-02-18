import React from 'react';
import ReactDOM from 'react-dom';

var socket = io();  

import Board from './components/Board.jsx';
import Reset from './components/Reset.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      tiles: [],
      isFirst: null,
      selectedTile: null,
      select: false,
    };

    this.selectTile = this.selectTile.bind(this);
    this.createTile = this.createTile.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
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
    // bubble node selection up to tile
    if (node.nodeName !== 'DIV') {
      while (node.nodeName !== 'DIV') {
        node = node.parentNode;
      }
    }
    var selectColor = this.state.isFirst ? 'cyan' : 'pink';
    if (this.state.select) {
      var rowFrom = this.state.selectedTile.dataset.row;
      var colFrom = this.state.selectedTile.dataset.col;
      var rowTo = node.dataset.row;
      var colTo = node.dataset.col;
      socket.emit('move', rowFrom, colFrom, rowTo, colTo);
      this.clearSelection();
      this.setState({ 
        select: false,
        selectedTile: null 
      });
    } else {
      node.classList.add(selectColor);      
      this.setState({ 
        select: true, 
        selectedTile: node 
      });
    }
    console.log(this.state.selectedTile)
  }

  createTile(e) {
    var tiles = this.state.tiles;
    tiles.push(e);
    this.setState({ tiles: tiles });
  }

  clearSelection() {
    var selectColor = this.state.isFirst ? 'cyan' : 'pink';
    this.state.tiles.forEach(e => e.classList.remove(selectColor));
  }

  render() {
  	return (
  		<div className='fullHeight'>
  			<Board 
          board={this.state.board}
          selectTile={this.selectTile}
          createTile={this.createTile}
        />
        <Reset 
          socket={socket}
          clearSelection={this.clearSelection} 
        />
  		</div>
  	);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));