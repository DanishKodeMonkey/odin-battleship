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
		console.log('start trigger')
		if (this.isReady()) {
			console.log('ready')
			this.game()
			return true
		} else {
			console.log('not ready')
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
		console.log('promptShipPlacement trigger')
		const currentPlayer = this.PlayerOne
		const nextShipToPlace = currentPlayer.board.shipsToPlace[0]
		if (nextShipToPlace) {
			placeShipToDOM(
				nextShipToPlace,
				this.PlayerOne,
				this.PlayerOne.board,
				this.promptShipPlacement.bind(this)
			)
		} else {
			if (this.isReady()) {
				this.game()
			} else {
				console.error(
					'Error: Unable to start game, not all ships have been placed.'
				)
			}
			return
		}
	}

	isGameOver() {
		// game over logic
	}
}
