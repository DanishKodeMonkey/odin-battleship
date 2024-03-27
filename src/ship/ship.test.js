import Ship from './ship'

describe('ship class methods', () => {
	let testShip = new Ship('submarine')
	describe('creating a ship', () => {
		let carrierTest = new Ship('carrier')
		let battleshipTest = new Ship('battleship')
		let destroyerTest = new Ship('destroyer')
		let submarineTest = new Ship('submarine')
		let patrolBoatTest = new Ship('patrolBoat')
		it('creating a ship should be done per ship class', () => {
			expect(carrierTest.shipType).toBe('carrier')
			expect(battleshipTest.shipType).toBe('battleship')
			expect(destroyerTest.shipType).toBe('destroyer')
			expect(submarineTest.shipType).toBe('submarine')
			expect(patrolBoatTest.shipType).toBe('patrolBoat')
		})
		it('created ships should have appropriate sizes', () => {
			expect(carrierTest.size).toBe(5)
			expect(battleshipTest.size).toBe(4)
			expect(destroyerTest.size).toBe(3)
			expect(submarineTest.size).toBe(3)
			expect(patrolBoatTest.size).toBe(2)
		})
		it('created ships should have appropriate health scores', () => {
			expect(carrierTest.health).toBe(5)
			expect(battleshipTest.health).toBe(4)
			expect(destroyerTest.health).toBe(3)
			expect(submarineTest.health).toBe(3)
			expect(patrolBoatTest.health).toBe(2)
		})
	})
	describe('hit() method', () => {
		it('hit() should be a function', () => {
			expect(typeof testShip.hit).toBe('function')
		})
		it('hit should return 1 hit', () => {
			expect(testShip.hit()).toBe(1)
		})
		it('hit should result in lower ship health', () => {
			expect(testShip.health).toBe(2)
		})
	})

	describe('isSunk() method', () => {
		it('returns falsy if not sunk.', () => {
			// at 1 hit, 3 health, should not be sunk.
			expect(testShip.isSunk()).toBeFalsy()
		})
		it('returns truthy if sunk( 3 more hits taken )', () => {
			// take 3 more hits, should be sunk
			testShip.hit()
			testShip.hit()
			testShip.hit()
			expect(testShip.isSunk()).toBeTruthy()
		})
	})
	describe('updateHealth()', () => {
		it('updateHealth() should never count below 0', () => {
			testShip.hit()
			testShip.hit()
			testShip.hit()
			testShip.hit()
			expect(testShip.health).toBe(0)
		})
	})
})
