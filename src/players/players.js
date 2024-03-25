import GameBoard from '../gameBoard/gameboard'
import Ship from '../ship/ship'
class Player {
	constructor(name, boardSize = 10, isNPC = false) {
		this.name = name
		this.board = new GameBoard(boardSize)
		this.isNPC = isNPC
		this.turn = this.checkIfNPC()
	}
	checkIfNPC() {
		if (this.isNPC) {
			return false
		} else {
			return true
		}
	}
}

function createNPC() {
	const npc = new Player('NPC', 10, true)
	console.log(npc.board)
	populateNPCgameBoard(npc.board, npc.board.placeShip.bind(npc.board))
	return npc
}

function populateNPCgameBoard(board, placeShip) {
	const shipsToPlace = [
		new Ship('carrier'),
		new Ship('battleship'),
		new Ship('destroyer'),
		new Ship('submarine'),
		new Ship('patrolBoat'),
	]
	const orientations = ['horizontal', 'vertical']
	const maxAttempts = 20
	let attempts = 0

	for (const ship of shipsToPlace) {
		let placed = false

		while (!placed && attempts < maxAttempts) {
			const randomRow = Math.floor(Math.random() * board.size)
			const randomCol = Math.floor(Math.random() * board.size)
			const randomOrientation =
				orientations[Math.floor(Math.random() * orientations.length)]
			try {
				placeShip(ship, [randomRow, randomCol], randomOrientation)
				placed = true
			} catch (error) {
				attempts++
				console.error(`error placing ship: ${error.message} tries: ${attempts}`)
			}
		}
	}
	board.printGrid()
}

export { Player, createNPC }
