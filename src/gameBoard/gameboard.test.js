import GameBoard from './gameboard'
import Ship from '../ship/ship'

describe('gameBoard tests', () => {
	const testBoard = new GameBoard(10)
	describe('the board grid', () => {
		it('the game board should hold a size attribute', () => {
			// gameBoard should be a class that forms a grid of cells based on
			// the input size (default 10x10)

			expect(testBoard.size).toBe(10)
		})
		it('The game board should be an object type to hold cells in an array', () => {
			expect(typeof testBoard.grid).toBe('object')
		})
		it('The game board should hold 10x10 cells resulting in an array of 100 cells', () => {
			expect(testBoard.grid.length).toBe(100)
		})
		it('Each cell should consist of a row and col coordinate(cell 0 should be row: 0, col 0', () => {
			expect(testBoard.grid[0]).toMatchObject({ row: 0, col: 0 })
		})
	})
	describe('the board functionality', () => {
		// Ship for testing
		const testShip = new Ship(4)
		it('Part game board grid should be able to be assigned to a ship.', () => {
			testBoard.placeShip(testShip, [0, 0], 'horizontal')
			expect(typeof testBoard.grid[0].ship).toBe('object')
		})
		it('the game board should also work with a vertically aligned ship', () => {
			const vertShip = new Ship(2)
			testBoard.placeShip(vertShip, [1, 0], 'vertical')
			expect(typeof testBoard.grid[11]).toBe('object')
		})
		describe('registerHit method', () => {
			it('The game board should register hits, and pass it to the ship hit method', () => {
				testBoard.registerHit([0, 0])
				expect(testShip.health).toBe(3)
			})
			it('The game board should register misses, marking those cells as miss', () => {
				testBoard.registerHit([0, 4])
				expect(testBoard.grid[4].ship).toBeFalsy()
			})
			it('The game board cells should remember if it was hit', () => {
				expect(testBoard.grid[0].isHit).toBeTruthy
			})
		})
		describe('shipCount', () => {
			it('shipCount should update as a ship is added', () => {
				expect(testBoard.shipCount).toBeGreaterThan(0)
			})
			it('shipCount should update as a ship is sunk', () => {
				testBoard.registerHit([0, 1])
				testBoard.registerHit([0, 2])
				testBoard.registerHit([0, 3])
				expect(testBoard.shipCount).toBeLessThan(2)
			})
			it('if shipCount reaches 0, game Over', () => {
				expect(testBoard.gameOver).tobeTruthy
			})
		})
	})
})
