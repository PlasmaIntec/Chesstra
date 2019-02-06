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
							var circleColor;
							if (sq == 5) circleColor = ' blue'
							if (sq == 6) circleColor = ' red'
							return (<div className={className}
								onClick={props.selectTile}
								data-row={rowIndex}
								data-col={sqIndex}>
								{
									((sq) ? (
										<svg viewBox='-1 -1 2 2'>
											<circle cx='0' cy='0' r='.8' fill={circleColor} />
										</svg>
									) : null)
								}
							</div>)
						})
					}
				</div>
			))
		}
	</div>
);

module.exports = Board;