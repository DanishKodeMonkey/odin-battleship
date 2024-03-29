import GameBoard from '../gameBoard/gameboard'
import Ship from '../ship/ship'
class Player {
	constructor(name, boardSize = 10, isNPC = false) {
		this.name = name
		this.board = new GameBoard(boardSize)
		this.isNPC = isNPC
		this.turn = false
		this.pointsHit = new Set()
	}

	processNPCTurn(targetBoard, changeTurn) {
		if (!this.isNPC || !this.turn) {
			console.log(this.name, ': Not my turn, waiting')
			return
		} else {
			let attempts = 0
			console.log(this.name, ': My turn!')

			while (attempts < 20) {
				console.log(`${this.name}: ${attempts} try...`)
				const randomRow = Math.floor(Math.random() * targetBoard.size)
				const randomCol = Math.floor(Math.random() * targetBoard.size)
				const targetPoint = [randomRow, randomCol]
				console.log(`${this.name}: Targeting ${targetPoint}`)
				if (!this.pointsHit.has(targetPoint)) {
					console.log(`NPC hits point [${randomRow}, ${randomCol}]`)
					this.pointsHit.add(targetPoint)
					this.turn = false
					changeTurn()
					return // Exit loop and function after successful hit
				}
				// If failing once
				console.error(`${this.name}: I hit this already, retrying...`)
				attempts++
			}

			// if fail 20 times
			throw new Error('Failed to target a valid point after multiple attempts.')
		}
	}

	// method to check if a point has been hit already
	hasPointBeenHit(row, col) {
		return this.pointsHit.has(`${row}, ${col}`)
	}

	// method to mark a point as hit in history
	markPointAsHit(row, col) {
		this.pointsHit.add(`${row}, ${col}`)
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
