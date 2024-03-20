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
		return this.hits
	}
	updateHealth() {
		this.health = this.size - this.hits
	}
}
