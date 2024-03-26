import { Player, createNPC } from '../players/players'

const gameController = (playerOneName, playerTwoName) => {
	const checkIfNPC = () => {
		if (playerTwoName) {
			return new Player(playerTwoName)
		} else {
			return createNPC()
		}
	}
	const PlayerOne = new Player(playerOneName)
	const PlayerTwo = checkIfNPC()

	const isReady = () => {
		const playerOneReady = PlayerOne.board.isReady
		const playerTwoReady = PlayerTwo.board.isReady

		console.log(playerOneReady, playerTwoReady)
		return playerOneReady && playerTwoReady
	}
	const getPlayerName = () => {
		return PlayerOne.name
	}

	const start = () => {
		if (isReady()) {
			return true // start game condition
		} else {
			return false // game not ready to start
		}
	}
	return {
		PlayerOne,
		PlayerTwo,
		getPlayerName,
		start,
	}
}

export default gameController
