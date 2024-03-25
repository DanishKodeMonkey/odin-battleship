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
		const testCarrier = new Ship('testCarrier')
		const testBattleship = new Ship('battleship')
		const testDestroyer = new Ship('destroyer')
		const testSubmarine = new Ship('submarine')
		const testPatrolBoat = new Ship('patrolBoat')

		it('Part game board grid should be able to be assigned to a ship.', () => {
			testBoard.placeShip(testBattleship, [0, 0], 'horizontal')
			expect(typeof testBoard.grid[0].ship).toBe('object')
		})
		it('the game board should also work with a vertically aligned ship', () => {
			testBoard.placeShip(testCarrier, [1, 0], 'vertical')
			expect(typeof testBoard.grid[11]).toBe('object')
		})
		it('the game board should not allow overlaps', () => {
			testBoard.placeShip(testDestroyer, [2, 2], 'vertical')

			expect(() =>
				testBoard.placeShip(testSubmarine, [3, 1], 'horizontal')
			).toThrow(new Error(`submarine is overlapping with destroyer`))
			expect(testBoard.grid[31].ship).toBe(null)
			testBoard.printGrid()
		})
		it('the game board should keep track of placed ships( the fleet )', () => {
			expect(testBoard.fleet).toContain(
				testBattleship,
				testCarrier,
				testBattleship
			)
		})
		it('the game board should not allow placing ships that already exist ( 1 of each )', () => {
			expect(() =>
				testBoard.placeShip(testBattleship, [3, 3], 'vertical')
			).toThrow(new Error('battleship has already been placed'))
		})
		it('the game board should mark as ready when all ships are placed', () => {
			testBoard.placeShip(testPatrolBoat, [4, 3], 'horizontal')
			testBoard.placeShip(testSubmarine, [5, 4], 'vertical')
			expect(testBoard.isReady).toBe(true)
		})

		describe('registerHit method', () => {
			it('The game board should register hits, and pass it to the ship hit method', () => {
				testBoard.registerHit([0, 0])
				expect(testDestroyer.health).toBe(3)
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
				expect(testBoard.shipCount).toBeLessThan(4)
			})
			it('if shipCount reaches 0, game Over', () => {
				expect(testBoard.gameOver).toBeTruthy
			})
		})
	})
})
