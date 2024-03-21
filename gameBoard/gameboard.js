export default class GameBoard {
	constructor(size = 10) {
		this.size = size
		this.grid = this.formGrid(this.size)
	}

	Cell(row, col) {
		return {
			row: row,
			col: col,
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
}
