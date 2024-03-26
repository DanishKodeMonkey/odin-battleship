import { Player, createNPC, populateNPCgameBoard } from './players'

describe('Player class tests', () => {
	const playerOne = new Player('Jane')

	describe('Player creation', () => {
		it('A player should be assigned a name', () => {
			expect(playerOne.name).toBe('Jane')
		})
		it('A player should be assigned a game Board object', () => {
			expect(typeof playerOne.board).toBe('object')
		})
	})
	describe('Player state', () => {
		it('the player should start in-turn', () => {
			expect(playerOne.turn).toBeTruthy()
		})
	})
})
describe('the NPC ', () => {
	let npc = createNPC()

	it('the NPC should be created through a seperate function call', () => {
		expect(typeof npc).toBe('object')
	})
	it('the NPC should have a populated gameBoard', () => {
		expect(npc.board.isReady).toBeTruthy
	})
	describe('populateNPCgameBoard function', () => {
		let testBoard

		beforeEach(() => {
			testBoard = {
				size: 10,
				placeShip: jest.fn(),
				clearGrid: jest.fn(),
				printGrid: jest.fn(),
			}
		})
		it('should place all ships on the board', () => {
			populateNPCgameBoard(testBoard, testBoard.placeShip)
			// assume the call is made for 5 ships, so 5 times.
			expect(testBoard.placeShip).toHaveBeenCalledTimes(5)
		})
		it('should handle maximum attempts reached for placing a ship', () => {
			// immitate(mock) a failed placement
			testBoard.placeShip.mockImplementation(() => {
				throw new Error('Placement failed')
			})

			// test it
			populateNPCgameBoard(testBoard, testBoard.placeShip)

			// assert that clearGrid was called as a result of maxAttempts being reached
			expect(testBoard.clearGrid).toHaveBeenCalled()
		})
	})
	describe('processNPCTurn method', () => {
		let mockPlayer
		beforeEach(() => {
			// mock an instance of the Players class as a player
			mockPlayer = new Player('MockPlayer', 10, false)
			// mock clearGrid method of opponents board
			mockPlayer.board.clearGrid = jest.fn()
			// spy on placeShip method of opponents board
			mockPlayer.board.placeShip = jest.fn()

			// reset pointsHit list for NPC
			npc.pointsHit = new Set()
		})

		it('should hit a random point on the players gameBoard', () => {
			//set the npcs turn to true
			npc.turn = true
			// create a console spy, using a no-op function to only intercept the calls
			// Thanks stackoverflow for this one
			const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

			npc.processNPCTurn(mockPlayer.board)

			expect(consoleSpy).toHaveBeenCalledWith(
				expect.stringContaining('NPC targets point')
			)
		})
	})
})
