import './style.css'

import renderBoard from './gameController/render'
import GameController from './gameController/gameController'

const game = new GameController('Player One')

renderBoard(game.PlayerOne.board, 'playerone-board', game.PlayerOne.name)
renderBoard(game.PlayerTwo.board, 'playertwo-board', game.PlayerTwo.name)
console.log(game.PlayerOne.board.isReady)
