import React from 'react';

var Board = (props) => (
	<div className='board'>
		{
			props.board.map((row, rowIndex) => (
				<div className='row'>
					{
						row.map((sq, sqIndex) => {
							var className = (rowIndex + sqIndex) % 2 === 0 
								? 'even square' 
								: 'odd square'
							if (sq === 5) className += ' blue'
							if (sq === 6) className += ' red'
							return (<div className={className}
								onClick={props.selectTile}
								data-row={rowIndex}
								data-col={sqIndex}>
								{sq}
							</div>)
						})
					}
				</div>
			))
		}
	</div>
);

module.exports = Board;