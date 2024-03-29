import './style.css'

import { renderBoard } from './render/render'
import GameController from './gameController/gameController'
import createModal from './render/modal'

function promptNewGame() {
	// create modal for inputting player name, modal submit will trigger newGame()
	const modal = createModal()
	modal.showModal()
}

export function newGame(playerOne) {
	// start new game
	const game = new GameController(playerOne)

	renderBoard(game.PlayerOne.board, 'playerone-board', game.PlayerOne.name)
	renderBoard(game.PlayerTwo.board, 'playertwo-board', game.PlayerTwo.name)

	game.start()
}
const newGameBtn = document.getElementById('new-game-button')
newGameBtn.addEventListener('click', (e) => {
	location.reload()
})

promptNewGame()
