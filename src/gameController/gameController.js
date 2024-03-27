import { Player, createNPC } from '../players/players'
import { placeShipToDOM } from '../render/render'

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
			this.promptShipPlacement()
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
	promptShipPlacement() {
		const currentPlayer = this.PlayerOne
		const nextShipToPlace = currentPlayer.board.shipsToPlace[0]
		placeShipToDOM(nextShipToPlace, this.PlayerOne)
	}

	isGameOver() {
		// game over logic
	}
}
