import { Player, createNPC } from '../players/players'
import {
	placeShipToDOM,
	updateTurnDOM,
	setupAttackListeners,
} from '../render/render'

// STOP TRYING TO RENDER STUFF AND HANDLE INFORMATION THAT OTHER MODULES SHOULD HANDLE DUDE AARR!
// initialize a render for each players board here, but handle it in another module.
export default class GameController {
	constructor(playerOneName, playerTwoName) {
		this.PlayerOne = new Player(playerOneName)
		this.PlayerTwo = playerTwoName ? new Player(playerTwoName) : createNPC()
		this.currentPlayer = this.PlayerOne
	}

	isReady() {
		return this.PlayerOne.board.isReady && this.PlayerTwo.board.isReady
	}
	start() {
		if (this.isReady()) {
			this.game()
			return true
		} else {
			updateTurnDOM('Place your ships')
			this.promptShipPlacement()
			return false
		}
	}
	allShipsPlacedCallback() {
		this.start()
	}
	game() {
		if (this.isGameOver()) {
			// end the game loop, game over
			return
		}
		console.log('game trigger')
		updateTurnDOM(this.currentPlayer.name)
		this.startTurn(
			this.currentPlayer,
			this.currentPlayer === this.PlayerOne ? this.PlayerTwo : this.PlayerOne
		)
	}
	startTurn(attacker, defender) {
		console.log('starting turn: ', attacker.name, defender.name)
		if (attacker.isNPC) {
			defender.turn = false
			attacker.turn = true
			attacker.processNPCTurn(defender.board, () => {
				this.changeTurn()
				this.game()
			})
		} else {
			defender.turn = false
			attacker.turn = true
			setupAttackListeners(attacker, defender, () => {
				this.changeTurn()
				this.game()
			})
		}
	}

	changeTurn() {
		this.currentPlayer =
			this.currentPlayer === this.PlayerOne ? this.PlayerTwo : this.PlayerOne
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
		return this.PlayerOne.board.gameOver() || this.PlayerTwo.board.gameOver()
	}
}
