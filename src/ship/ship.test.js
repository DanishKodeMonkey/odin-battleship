import Ship from './ship'

describe('ship class methods', () => {
	let testShip = new Ship(4, [2, 2], [2, 4])
	describe('hit() method', () => {
		it('hit() should be a function', () => {
			expect(typeof testShip.hit).toBe('function')
		})
		it('hit should return 1 hit', () => {
			expect(testShip.hit()).toBe(1)
		})
		it('hit should result in lower ship health', () => {
			expect(testShip.health).toBe(3)
		})
	})
})
