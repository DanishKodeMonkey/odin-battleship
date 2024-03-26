import { Player, createNPC } from '../players/players'

const gameController = (playerOneName, playerTwoName = createNPC()) => {
	const PlayerOne = new Player(playerOneName)
	const PlayerTwo = playerTwoName

	getPlayerName = () => {
		return PlayerOne.name
	}
	return {
		PlayerOne,
		PlayerTwo,
		getPlayerName,
	}
}

export default gameController
