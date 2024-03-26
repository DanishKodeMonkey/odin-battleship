import gameController from './gameController'

describe('gameController', () => {
	let playerName = 'player One'
	const game = gameController(playerName)

	it('should initialize using the input of a player name', () => {
		expect(game.PlayerOne.name).toBe(playerName)
	})
	it('should initialize two players, playerOne and NPC', () => {
		expect(game.PlayerOne.name).toBe(playerName)
		expect(game.PlayerTwo.name).toBe('NPC')
	})
	it('should initialize players as Player class objects', () => {
		expect(typeof game.PlayerOne).toBe('object')
		expect(typeof game.PlayerTwo).toBe('object')
	})
})
