import { Player, createNPC } from './players'

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
	it('the NPC should be created through a seperate function call', () => {
		const npc = createNPC()
		expect(typeof npc).toBe('object')
	})
})