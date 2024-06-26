function renderBoard(gameBoard, containerID, player) {
	console.log('render triggered, received: ', gameBoard, containerID, player)
	const boardContainer = document.getElementById('board-container')
	console.log(boardContainer)
	const container = document.getElementById(containerID)
	container.innerHTML = ''

	const playerName = document.createElement('div')
	playerName.classList.add('player-name')
	playerName.textContent = player
	container.appendChild(playerName)

	const grid = document.createElement('div')
	grid.classList.add('grid-container')
	grid.setAttribute('id', `${player}-grid`)
	console.log(grid)

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
	boardContainer.appendChild(container)
}

function updateTurnDOM(player) {
	const turnDiv = document.getElementById('turn-div')
	turnDiv.textContent = ''
	const turnTitle = document.createElement('p')
	turnTitle.classList.add('turn-title')
	turnTitle.textContent = 'Player turn:'
	const turnText = document.createElement('p')
	turnText.classList.add('turn-text')
	turnText.textContent = player

	turnDiv.append(turnTitle, turnText)
}

function placeShipToDOM(
	ship,
	player,
	board,
	promptShipPlacement,
	allShipsPlacedCallback
) {
	if (board.fleet.length === 0) {
		placeInstructions()
	}
	console.log('placeShipToDOM trigger received: ', ship, player)
	const name = player.name
	const grid = document.getElementById(`${name}-grid`)
	let shipOrientation = 'horizontal'

	function toggleShipOrientation() {
		shipOrientation =
			shipOrientation === 'horizontal' ? 'vertical' : 'horizontal'
		console.log('Ship orientation toggled to', shipOrientation)
	}

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
			const alignment = shipOrientation

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
						const nextCellElement = grid.querySelector(
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
			board.placeShip(ship, [x, y], shipOrientation)
			updateBoard(board, name, player)
			if (board.shipsToPlace.length !== 0) {
				console.log('more ships found: ', board.shipsToPlace)
				promptShipPlacement()
			} else {
				console.log('no more ships found, start game.')
				clearInstructions()
				allShipsPlacedCallback()
			}
		})
	})
	document.addEventListener('keydown', function (e) {
		if (e.key === 'r' || e.key === 'R') {
			if (e.repeat) {
				return
			} else {
				toggleShipOrientation()
				// Update ship orientation and highlight cells accordingly
				cells.forEach((cell) => {
					cell.dispatchEvent(new Event('mouseout')) // Remove previous hover effect
					cell.dispatchEvent(new Event('mouseover')) // Apply new hover effect
				})
			}
		}
	})
}

function setupAttackListeners(attacker, defender, endTurnCallback) {
	const defenderName = defender.name
	const defenderGrid = document.getElementById(`${defenderName}-grid`)
	const cells = defenderGrid.querySelectorAll('.cell')
	/*  Thank you internet for this one, use an AbortController to clear listeners after turn */
	const controller = new AbortController()

	/*  extract the signal property from the controller to be used. */
	const { signal } = controller
	cells.forEach((cell) => {
		cell.addEventListener('mouseover', function () {
			// add shiphover class to the hovered cell
			cell.classList.add('boardTarget')
		})
		cell.addEventListener('mouseout', function () {
			// remove shiphover class from all cells
			cells.forEach((cell) => cell.classList.remove('boardTarget'))
		})

		cell.addEventListener(
			'click',
			function () {
				console.log('cell hit trigger')
				const coordinate = this.getAttribute('coordinate').split(',')
				const x = parseInt(coordinate[0])
				const y = parseInt(coordinate[1])
				if (!attacker.hasPointBeenHit(x, y)) {
					const cellContent = this.querySelector('.cellContent')
					const isHit = defender.board.registerHit([x, y]) // returns boolean if hit to isHit
					attacker.markPointAsHit(x, y) // add point to hit history of attacker
					if (isHit) {
						cellContent.textContent = 'X' // hit marker
						this.classList.add('shipHit')
						if (endTurnCallback) {
							endTurnCallback()
						}
					} else {
						cellContent.textContent = '/'
						this.classList.add('missedHit')
						if (endTurnCallback) {
							endTurnCallback()
						}
					}
					// once a cell is clicked, the abortController is triggered, nuking all event listeners
					controller.abort()
				} else {
					console.log('This point has already been attacked. Try again.')
				}
			},
			// abort signal is assigned as third argument to all event listeners on all cells
			{ signal }
		)
	})
}

function updateBoard(board, name, player) {
	console.log('updating board: ', board, name, player.isNPC)
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
					player.isNPC === false ? 'playerOneShip' : 'playerTwoShip'
				)
			}
			cellDiv.appendChild(cellContent)
			grid.appendChild(cellDiv)
		}
	}
}

function placeInstructions() {
	const turnDiv = document.getElementById('turn-div')
	const instructionsDiv = document.createElement('div')
	instructionsDiv.classList.add('instructionsDiv')
	instructionsDiv.textContent = 'Press R to rotate, mouse click to place.'
	turnDiv.appendChild(instructionsDiv)
}
function clearInstructions() {
	const turnDiv = document.getElementById('turn-div')
	const instructionsDiv = turnDiv.querySelector('.instructionsDiv')
	turnDiv.removeChild(instructionsDiv)
}
function declareWinner(player) {
	const winner = player.toUpperCase()
	const turnContainer = document.getElementById('turn-div')
	turnContainer.textContent = ''
	const boardContainer = document.getElementById('board-container')
	boardContainer.textContent = ''
	const winnerBox = document.createElement('div')
	winnerBox.classList.add('winner')
	winnerBox.textContent = winner + ' WINS!!!'
	boardContainer.appendChild(winnerBox)
}
export {
	renderBoard,
	placeShipToDOM,
	updateBoard,
	updateTurnDOM,
	setupAttackListeners,
	declareWinner,
}
