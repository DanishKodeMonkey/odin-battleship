import GameBoard from '../gameBoard/gameboard'
import Ship from '../ship/ship'
class Player {
	constructor(name, boardSize = 10, isNPC = false) {
		this.name = name
		this.board = new GameBoard(boardSize)
		this.isNPC = isNPC
		this.turn = this.checkIfNPC()
		this.pointsHit = new Set()
	}
	checkIfNPC() {
		if (this.isNPC) {
			return false
		} else {
			return true
		}
	}
	processNPCTurn(targetBoard) {
		if (!this.isNPC || !this.turn) {
			throw new Error('Is not NPC, or is not NPC turn. Skipping.')
		}
		let attempts = 0

		while (attempts < 20) {
			const randomRow = Math.floor(Math.random() * targetBoard.size)
			const randomCol = Math.floor(Math.random() * targetBoard.size)
			const targetPoint = [randomRow, randomCol]

			if (!this.pointsHit.has(targetPoint)) {
				console.log(`NPC targets point [${randomRow}, ${randomCol}]`)
				this.pointsHit.add(targetPoint)
				return // Exit loop and function after successful hit
			}
			// If failing once
			console.error('Invalid point targeted, already hit before. Retrying...')
			attempts++
		}
		// if fail 20 times
		throw new Error('Failed to target a valid point after multiple attempts.')
	}
}

function createNPC() {
	const npc = new Player('NPC', 10, true)
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
			// clear the board before attempting 20 times.

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

	if (attempts === maxAttempts) {
		console.log('Maximum attempts to populate game board reached. Resetting.')
		board.clearGrid()
		attempts = 0
	}
	board.printGrid()
	console.log(`Took ${attempts + 1}/${maxAttempts} attempts`)
}

export { Player, createNPC, populateNPCgameBoard }
