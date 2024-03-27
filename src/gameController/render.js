export default function renderBoard(gameBoard, containerID, player) {
	const container = document.getElementById(containerID)
	container.innerHTML = '' // Clear existing content

	const playerName = document.createElement('div')
	playerName.classList.add('player-name')
	playerName.textContent = player
	container.appendChild(playerName)

	const grid = document.createElement('div')
	grid.classList.add('grid-container')

	for (let row = 0; row < gameBoard.size; row++) {
		for (let col = 0; col < gameBoard.size; col++) {
			const cellDiv = document.createElement('div')
			cellDiv.classList.add('cell') // Apply cell class from CSS
			cellDiv.addEventListener('click', () => cellClick())
			const cellContent = document.createElement('p')
			cellContent.classList.add('cellContent')
			const cell = gameBoard.grid.find(
				(cell) => cell.row === row && cell.col === col
			)

			if (cell.ship) {
				/* 				cellContent.textContent = 'X' */
				containerID === 'playerone-board'
					? cellDiv.classList.add('playerOneShip')
					: cellDiv.classList.add('playerTwoShip') // Display 'X' if the cell contains a ship
			} else {
				/* 				cellContent.textContent = '-' */
				// Display '-' if the cell is empty
			}
			cellDiv.appendChild(cellContent)
			grid.appendChild(cellDiv)
		}
	}
	container.appendChild(grid)
}

function cellClick() {
	console.log('click!')
}
