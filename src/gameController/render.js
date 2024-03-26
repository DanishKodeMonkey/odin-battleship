export default function renderBoard(gameBoard, containerID) {
	const container = document.getElementById(containerID)
	container.innerHTML = '' // Clear existing content

	const grid = document.createElement('div')
	grid.classList.add('grid-container')

	for (let row = 0; row < gameBoard.size; row++) {
		for (let col = 0; col < gameBoard.size; col++) {
			const cellDiv = document.createElement('div')
			cellDiv.classList.add('cell') // Apply cell class from CSS
			const cellContent = document.createElement('p')
			cellContent.classList.add('cellContent')
			const cell = gameBoard.grid.find(
				(cell) => cell.row === row && cell.col === col
			)

			if (cell.ship) {
				cellContent.textContent = 'X' // Display 'X' if the cell contains a ship
			} else {
				cellContent.textContent = '-' // Display '-' if the cell is empty
			}
			cellDiv.appendChild(cellContent)
			grid.appendChild(cellDiv)
			container.appendChild(grid)
		}
	}
}
