import { newGame } from '../index'

export default function createModal() {
	// modal container
	const modal = document.createElement('dialog')
	modal.classList.add('modal')
	modal.setAttribute('id', 'modal')

	const form = document.createElement('form')
	form.classList.add('modal-form')
	form.setAttribute('autocomplete', 'off')

	// forms title
	const formTitle = document.createElement('p')
	formTitle.classList.add('modalTitle')
	formTitle.textContent = "Let's play battleship!"
	// player name label
	const playerNameLabel = document.createElement('label')
	playerNameLabel.setAttribute('for', 'playerNameInput')
	playerNameLabel.classList.add('modalLabel')
	playerNameLabel.textContent = 'Player one name: '

	// player name input
	const playerNameInput = document.createElement('input')
	playerNameInput.classList.add('modalInput')
	playerNameInput.setAttribute('id', 'playerNameInput')
	playerNameInput.setAttribute('name', 'playerNameInput')
	playerNameInput.setAttribute('required', '')

	// button div
	const btnDiv = document.createElement('div')
	btnDiv.classList.add('btnDiv')

	// submit button
	const submitBtn = document.createElement('input')
	submitBtn.classList.add('modal-button')
	submitBtn.setAttribute('type', 'submit')
	submitBtn.setAttribute('id', 'submit')
	submitBtn.setAttribute('value', 'submit')

	// cancel button
	const cancelBtn = document.createElement('input')
	cancelBtn.classList.add('modal-button')
	cancelBtn.setAttribute('type', 'submit')
	cancelBtn.setAttribute('id', 'cancel')
	cancelBtn.setAttribute('value', 'cancel')
	btnDiv.append(submitBtn, cancelBtn)

	submitBtn.addEventListener('click', (e) => {
		e.preventDefault()
		if (playerNameInput.value) {
			newGame(playerNameInput.value)
			modal.close()
		} else {
			alert('please input a player name')
		}
	})
	cancelBtn.addEventListener('click', (e) => {
		e.preventDefault()
		playerNameInput.value = ''
	})

	form.append(formTitle, playerNameLabel, playerNameInput, btnDiv)

	modal.appendChild(form)
	console.log()
	document.body.appendChild(modal)
	return modal
}
