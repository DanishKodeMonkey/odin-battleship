import GameBoard from './gameboard'

describe('gameBoard tests', () => {
	const testBoard = new GameBoard(10)
	it('the game board should hold a size attribute', () => {
		// gameBoard should be a class that forms a grid of cells based on
		// the input size (default 10x10)

		expect(testBoard.size).toBe(10)
	})
	it('The game board should be an object type to hold cells', () => {
		expect(typeof testBoard.grid).toBe('object')
	})
	it('The game board should hold 10x10 cells resulting in an array of 100 cells', () => {
		expect(testBoard.grid.length).toBe(100)
	})
	it('Each cell should consist of a row and col coordinate(cell 0 should be row: 0, col 0', () => {
		expect(testBoard.grid[0]).toEqual({ row: 0, col: 0 })
	})
})
