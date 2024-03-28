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
		return this.PlayerOne.board.isReady && this.PlayerTwo.board.isReady
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
	allShipsPlacedCallback() {
		this.start()
	}
	game() {
		console.log('game now starting')
		this.currentPlayer = this.PlayerOne
		this.changeTurn()
	}
	changeTurn() {
		this.PlayerOne.turn = !this.PlayerOne.turn
		this.PlayerTwo.turn = !this.PlayerTwo.turn
	}
	promptShipPlacement() {
		const currentPlayer = this.PlayerOne

		if (currentPlayer.board.shipsToPlace.length > 0) {
			const nextShipToPlace = currentPlayer.board.shipsToPlace[0]

			placeShipToDOM(
				nextShipToPlace,
				this.PlayerOne,
				this.PlayerOne.board,
				this.promptShipPlacement.bind(this),
				this.allShipsPlacedCallback.bind(this)
			)
		}
	}

	isGameOver() {
		// game over logic
	}
}
