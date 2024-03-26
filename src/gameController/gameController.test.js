import gameController from './gameController'
import { populateNPCgameBoard } from '../players/players'

describe('gameController', () => {
	let game
	beforeEach(() => {
		game = gameController('Player One', 'NPC')
	})

	it('should initialize two players, playerOne and NPC', () => {
		expect(game.PlayerOne.name).toBe('Player One')
		expect(game.PlayerTwo.name).toBe('NPC')
	})
	it('should initialize players as Player class objects', () => {
		expect(typeof game.PlayerOne).toBe('object')
		expect(typeof game.PlayerTwo).toBe('object')
	})
	it('should wait for both player one, and player two boards to be ready', () => {
		game.PlayerOne.board.isReady = false
		game.PlayerTwo.board.isReady = true
		console.log(game.PlayerOne.board.isReady, game.PlayerTwo.board.isReady)
		// check if game is ready to start
		const gameReady = game.start()

		expect(gameReady).toBe(false)
	})
	it('should start game when both players are ready', () => {
		game.PlayerOne.board.isReady = true
		game.PlayerTwo.board.isReady = true

		const gameReady = game.start()
		expect(gameReady).toBe(true)
	})
})
