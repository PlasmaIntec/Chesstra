import React from 'react';

import { Pawn, King } from './PieceDesign.jsx';

var Board = (props) => (
	<div className='board'>
		{
			props.board.map((row, rowIndex) => (
				<div className='row' key={rowIndex}>
					{
						row.map((sq, sqIndex) => {
							var className = (rowIndex + sqIndex) % 2 === 0 
								? 'even square' 
								: 'odd square'
							var circleColor, piece;
							if (sq && sq[0] == 'b') circleColor = 'blue'
							if (sq && sq[0] == 'r') circleColor = 'red'
							if (sq && sq[1] == 'p') piece = King(circleColor)
							if (sq && sq[1] === undefined) piece = Pawn(circleColor)
							return (<div className={className}
								onClick={props.selectTile}
								ref={props.createTile}
								key={`${rowIndex},${sqIndex}`}
								data-row={rowIndex}
								data-col={sqIndex}>
								{piece}
							</div>)
						})
					}
				</div>
			))
		}
	</div>
);

module.exports = Board;