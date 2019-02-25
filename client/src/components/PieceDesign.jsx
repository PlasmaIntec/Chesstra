import React from 'react';

module.exports = {
	Pawn: (color) => (
		<svg viewBox='-1 -1 2 2'>
			<circle cx='0' cy='0' r='.8' fill={color} />
		</svg>
	),
	King: (color) => (
		<svg viewBox='-1 -1 2 2'>
			<text x="0" y="0" fill={color} fontSize='2px' dominantBaseline="middle" textAnchor="middle">K</text>
		</svg>
	)
};