//=================================
// GAME PIECE INTERNAL LOGIC
//=================================

console.log('game handler loaded');

var self = module.exports = {
	pawnMove: (player, ...move) => {
		console.log('PAWNMOVE:', player, ...move);
		var dir = player === 'r' ? 1 : -1;
		var validRow = +[...move][0] + dir, validCol = +[...move][1];
		return [[validRow, validCol]];
	},
	route: (piece, ...move) => {
		if (piece) {
			var pieceType = piece[1];
			var player = piece[0];
			if (pieceType === 'p') {
				return self.pawnMove(player, ...move);
			}
		}
	},
};