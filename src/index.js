import './style.css'

import renderBoard from './gameController/render'
import GameController from './gameController/gameController'

const game = new GameController('Player One')

renderBoard(game.PlayerOne.board, 'playerone-board')
renderBoard(game.PlayerTwo.board, 'playertwo-board')
