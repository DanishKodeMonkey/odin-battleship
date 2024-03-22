export default class Ship {
	constructor(size, startCoords, endCoords) {
		this.size = size
		this.start = startCoords
		this.end = endCoords
		this.hits = 0
		this.health = this.updateHealth()
	}
	hit() {
		this.hits += 1
		this.updateHealth()
		this.isSunk()
		return this.hits
	}
	updateHealth() {
		this.health = Math.max(0, this.size - this.hits)
	}
	isSunk() {
		return this.health === 0 ? true : false
	}
}
