export default class GameBoard {
	constructor(size = 10) {
		this.size = size
		this.grid = this.formGrid(this.size)
		this.shipCount = this.updateShips()
		this.fleet = []
		this.gameOver = false
	}

	Cell(row, col) {
		return {
			row: row,
			col: col,
			ship: null,
			isHit: false,
			registerHit: function () {
				if (this.ship) {
					this.ship.hit()
				}
			},
		}
	}
	formGrid(size) {
		const grid = []
		for (let row = 0; row < size; row++) {
			for (let col = 0; col < size; col++) {
				grid.push(this.Cell(row, col))
			}
		}
		return grid
	}
	placeShip(ship, startCoord, alignment) {
		const startRow = startCoord[0]
		const startCol = startCoord[1]
		// record of changes made to grid.
		let cellsOccupiedByShip = []

		try {
			// check if ship has already been placed
			if (
				this.fleet.some(
					(existingShip) => existingShip.shipType === ship.shipType
				)
			) {
				throw new Error(`${ship.shipType} has already been placed`)
			}

			// otherwise, trying to place...
			if (alignment === 'horizontal') {
				for (let i = 0; i < ship.size; i++) {
					if (startCol + i >= this.size) {
						throw new Error('Ship placement out of bounds.')
					}
					const cell = this.grid.find(
						(cell) => cell.row === startRow && cell.col === startCol + i
					)
					if (cell.ship) {
						throw new Error(
							`${ship.shipType} is overlapping with ${cell.ship.shipType}`
						)
					} else {
						cell.ship = ship
						cellsOccupiedByShip.push(cell)
					}
				}
			} else if (alignment === 'vertical') {
				for (let i = 0; i < ship.size; i++) {
					if (startRow + i >= this.size) {
						throw new Error('Ship placement out of bounds.')
					}
					const cell = this.grid.find(
						(cell) => cell.row === startRow + i && cell.col === startCol
					)
					if (cell.ship) {
						throw new Error(
							`${ship.shipType} is overlapping with ${cell.ship.shipType}`
						)
					} else {
						cell.ship = ship
						cellsOccupiedByShip.push(cell)
					}
				}
			} else {
				throw new Error('Invalid alignment')
			}
		} catch (error) {
			// handle error and revert changes made to the grid.
			cellsOccupiedByShip.forEach((cell) => {
				cell.ship = null
			})
			// pass error
			this.printGrid()
			throw error
		}
		this.updateShips()
		this.updateFleet(ship)
	}
	registerHit(coords) {
		const row = coords[0]
		const col = coords[1]
		const hitCell = this.grid.find(
			(cell) => cell.row === row && cell.col === col
		)
		if (hitCell.isHit) {
			return // do nothing, cell was already hit.
		}
		// ship not null, HIT!
		if (hitCell.ship) {
			hitCell.ship.hit()
			hitCell.isHit = true
		} else {
			// register cell as missed
			hitCell.isHit = true
		}
		this.updateShips()
	}
	updateShips() {
		// use a set to store the ships
		const ships = new Set()

		this.grid.forEach((cell) => {
			if (cell.ship && !cell.ship.isSunk()) {
				ships.add(cell.ship)
			}
		})
		// Update ship count based on the sets size
		this.shipCount = ships.size
	}
	updateFleet(ship) {
		if (ship) {
			this.fleet.push(ship)
		} else return
	}
	checkGameOver() {
		if (this.shipCount <= 0) return true
	}
	printGrid() {
		let gridString = ''
		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				const cell = this.grid.find(
					(cell) => cell.row === row && cell.col == col
				)
				if (cell.ship) {
					gridString += 'X'
				} else {
					gridString += '-'
				}
			}
			gridString += '\n'
		}
		console.log(gridString)
	}
}
