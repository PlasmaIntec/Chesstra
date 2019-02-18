import React from 'react';

var Reset = (props) => {
	var resetBoard = () => {
		props.socket.emit('reset');
		props.clearSelection();
	}
	return (
		<button onClick={resetBoard}>RESET</button>
	);
};

module.exports = Reset;