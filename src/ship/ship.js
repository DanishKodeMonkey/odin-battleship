export default class Ship {
	constructor(shipType) {
		this.shipType = shipType
		this.size = this.checkShipType(this.shipType)
		this.hits = 0
		this.health = this.updateHealth()
	}
	checkShipType(shipType) {
		switch (shipType) {
			case 'patrolBoat':
				return 2

			case 'submarine':
				return 3

			case 'destroyer':
				return 3

			case 'battleship':
				return 4

			case 'carrier':
				console.log('returning carrier')
				return 5
		}
	}
	updateHealth() {
		return Math.max(0, this.size - this.hits)
	}
	isSunk() {
		return this.health === 0 ? true : false
	}
	hit() {
		this.hits += 1
		this.health = this.updateHealth()
		this.isSunk()
		return this.hits
	}
}
