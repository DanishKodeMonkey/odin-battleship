import { Player, createNPC } from '../players/players'

// STOP TRYING TO RENDER STUFF AND HANDLE INFORMATION THAT OTHER MODULES SHOULD HANDLE DUDE AARR!
// initialize a render for each players board here, but handle it in another module.
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
		this.currentPlayer = this.PlayerOne
	}
	changeTurn() {
		this.PlayerOne.turn = !this.PlayerOne.turn
		this.PlayerTwo.turn = !this.PlayerTwo.turn
	}

	isGameOver() {
		// game over logic
	}
}
