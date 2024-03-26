import { Player, createNPC } from '../players/players'

export default class GameController {
	constructor(playerOneName, playerTwoName) {
		this.PlayerOne = new Player(playerOneName)
		this.PlayerTwo = playerTwoName ? new Player(playerTwoName) : createNPC()
		this.currentPlayer
	}
	isReady() {
		if (this.PlayerOne.board.isReady && this.PlayerTwo.board.isReady) {
			return true
		} else return false
	}
	start() {
		if (this.isReady()) {
			this.game()
			return true
		} else {
			return false
		}
	}
	game() {
		let currentPlayer = this.PlayerOne

		return currentPlayer
	}
	changeTurn() {
		this.PlayerOne.turn = !this.PlayerOne.turn
		this.PlayerTwo.turn = !this.PlayerTwo.turn
	}

	isGameOver() {
		// game over logic
	}
}
