import React from 'react';

var Board = (props) => (
	<div className='board'>
		{
			props.board.map((row, rowIndex) => (
				<div className='row'>
					{
						row.map((sq, sqIndex) => (
							<div className={
									(rowIndex + sqIndex) % 2 === 0 
									? 'even square' 
									: 'odd square'
								}
								onClick={props.selectTile}
								data-row={rowIndex}
								data-col={sqIndex}>
								{sq}
							</div>
						))
					}
				</div>
			))
		}
	</div>
);

module.exports = Board;