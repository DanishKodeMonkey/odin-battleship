import GameBoard from '../gameBoard/gameboard'

export default class Player {
	constructor(name, boardSize = 10, isNPC = false) {
		this.name = name
		this.board = new GameBoard(boardSize)
		this.isNPC = isNPC
		this.turn = this.checkIfNPC()
	}
	checkIfNPC() {
		if (this.isNPC) {
			return false
		} else {
			return true
		}
	}
}
