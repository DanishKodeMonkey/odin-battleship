function renderBoard(gameBoard, containerID, player) {
	console.log('render triggered, received: ', gameBoard, containerID, player)
	const container = document.getElementById(containerID)
	container.innerHTML = ''

	const playerName = document.createElement('div')
	playerName.classList.add('player-name')
	playerName.textContent = player
	container.appendChild(playerName)

	const grid = document.createElement('div')
	grid.classList.add('grid-container')
	grid.setAttribute('id', `${player}-grid`)

	for (let row = 0; row < gameBoard.size; row++) {
		for (let col = 0; col < gameBoard.size; col++) {
			const cellDiv = document.createElement('div')
			cellDiv.classList.add('cell') // Apply cell class from CSS
			cellDiv.setAttribute('coordinate', `${row},${col}`)
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

function placeShipToDOM(
	ship,
	player,
	board,
	promptShipPlacement,
	allShipsPlacedCallback
) {
	console.log('placeShipToDOM trigger received: ', ship, player)
	const name = player.name
	const grid = document.getElementById(`${name}-grid`)

	// retrieve all cell elements from grid

	const cells = grid.querySelectorAll('.cell')

	cells.forEach((cell) => {
		cell.addEventListener('mouseover', function () {
			// retrieve coordinates of the hovered cell
			const coordinate = cell.getAttribute('coordinate').split(',')
			const x = parseInt(coordinate[0])
			const y = parseInt(coordinate[1])

			// add shiphover class to the hovered cell
			cell.classList.add('shipHover')
			// determine number of adjacent cells to highlight
			const shipSize = ship.size
			const alignment = 'horizontal'

			if (alignment === 'horizontal') {
				for (let i = 1; i < shipSize; i++) {
					const nextCell = board.grid.find(
						(cell) => cell.row === x && cell.col === y + i
					)
					if (nextCell) {
						const nextCellElement = grid.querySelector(
							`.cell[coordinate='${x},${y + i}']`
						)
						nextCellElement.classList.add('shipHover')
					}
				}
			} else if (alignment === 'vertical') {
				for (let i = 1; i < shipSize; i++) {
					const nextCell = board.grid.find(
						(cell) => cell.row === x + i && cell.col === y
					)
					if (nextCell) {
						const nextCellElement = gridContainer.querySelector(
							`.cell[coordinate='${x + i},${y}']`
						)
						nextCellElement.classList.add('shipHover')
					}
				}
			}
		})
		cell.addEventListener('mouseout', function () {
			// remove shiphover class from all cells
			cells.forEach((cell) => cell.classList.remove('shipHover'))
		})
		cell.addEventListener('click', function () {
			console.log(
				'placing ship at',
				parseInt(this.getAttribute('coordinate').split(',')[0]),
				parseInt(this.getAttribute('coordinate').split(',')[1])
			)
			const coordinate = this.getAttribute('coordinate').split(',')
			const x = parseInt(coordinate[0])
			const y = parseInt(coordinate[1])
			board.placeShip(ship, [x, y], 'horizontal')
			updateBoard(board, name)
			if (board.shipsToPlace.length !== 0) {
				console.log('more ships found: ', board.shipsToPlace)
				promptShipPlacement()
			} else {
				console.log('no more ships found, start game.')
				allShipsPlacedCallback()
			}
		})
	})
}
function updateBoard(board, name) {
	const grid = document.getElementById(`${name}-grid`)

	// Clear existing content
	grid.innerHTML = ''

	// Render the updated grid
	for (let row = 0; row < board.size; row++) {
		for (let col = 0; col < board.size; col++) {
			const cellDiv = document.createElement('div')
			cellDiv.classList.add('cell')
			cellDiv.setAttribute('coordinate', row + ',' + col)
			const cellContent = document.createElement('p')
			cellContent.classList.add('cellContent')
			const cell = board.grid.find(
				(cell) => cell.row === row && cell.col === col
			)

			if (cell.ship) {
				cellDiv.classList.add(
					name === 'playerone' ? 'playerOneShip' : 'playerTwoShip'
				)
			} else {
				// Display '-' if the cell is empty
			}
			cellDiv.appendChild(cellContent)
			grid.appendChild(cellDiv)
		}
	}
}

export { renderBoard, placeShipToDOM, updateBoard }