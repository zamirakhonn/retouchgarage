'use strict'

// email validation
function InvalidMsg(textbox) {
	if (textbox.value == '') {
		textbox.setCustomValidity('Please enter your email address')
	} else if (textbox.validity.typeMismatch) {
		textbox.setCustomValidity('Please enter a valid email address')
	} else {
		textbox.setCustomValidity('')
	}
	return true
}

// AOS
AOS.init({
	duration: 1000,
	once: true,
})

document.querySelectorAll('[data-modal]').forEach((btn) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault()
		e.stopPropagation()
		const attr = btn.getAttribute('data-modal')
		document.querySelector(`.modal-${attr}`).classList.add('active')
	})
})

document.querySelectorAll('.modal__box').forEach((box) => {
	box.addEventListener('click', (e) => {
		e.stopPropagation()
	})
})

document.querySelectorAll('.modal__box .bx-x').forEach((x) => {
	x.addEventListener('click', () => {
		x.parentElement.parentElement.classList.remove('active')
	})
})

document.querySelector('body').addEventListener('click', (e) => {
	document.querySelectorAll('.modal').forEach((modal) => {
		modal.classList.remove('active')
	})
})

$(document).ready(function () {
	// quotes slider
	// $('.quotes__inner').owlCarousel({
	// 	responsive: {
	// 		0: {
	// 			items: 1,
	// 		},
	// 		676: {
	// 			items: 2,
	// 		},
	// 		1200: {
	// 			items: 3,
	// 		},
	// 	},
	// })

	// sample slider
	$('.sample__inner').owlCarousel({
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		nav: true,
		dots: false,
		navText: [
			`<img src='assets/img/arrow.svg' />`,
			`<img src='assets/img/arrow.svg' style='transform: rotate(180deg)' />`,
		],
		responsive: {
			items: 1,
			0: {
				items: 1,
			},
			676: {
				items: 2,
			},
			1200: {
				items: 3,
			},
		},
	})
})

// imageCompare
function initComparisons() {
	var x, i
	x = document.getElementsByClassName('resizer')
	for (i = 0; i < x.length; i++) {
		compareImages(x[i])
	}
	function compareImages(resizer) {
		// Query the element
		const leftSide = resizer.previousElementSibling
		const rightSide = resizer.nextElementSibling

		// The current position of mouse
		let x = 0
		let y = 0
		let leftWidth = 0

		// Handle the mousedown event
		// that's triggered when user drags the resizer
		const mouseDownHandler = function (e) {
			// Get the current mouse position
			x = e.clientX
			y = e.clientY
			leftWidth = leftSide.getBoundingClientRect().width

			// Attach the listeners to `document`
			document.addEventListener('mousemove', mouseMoveHandler)
			document.addEventListener('mouseup', mouseUpHandler)
		}

		const touchDownHandler = function (e) {
			x = e.targetTouches[0].clientX
			y = e.targetTouches[0].clientY
			leftWidth = leftSide.getBoundingClientRect().width

			document.addEventListener('touchmove', touchMoveHandler, false)
			document.addEventListener('touchend', touchUpHandler)
		}

		const mouseMoveHandler = function (e) {
			// How far the mouse has been moved
			const dx = e.clientX - x

			let newLeftWidth =
				((leftWidth + dx) * 100) /
				resizer.parentNode.getBoundingClientRect().width
			newLeftWidth = Math.max(newLeftWidth, 0)
			newLeftWidth = Math.min(newLeftWidth, 100)

			leftSide.style.width = `${newLeftWidth}%`
			resizer.style.left = `${newLeftWidth}%`

			resizer.style.cursor = 'col-resize'
			resizer.parentNode.style.cursor = 'col-resize'

			leftSide.style.userSelect = 'none'
			leftSide.style.pointerEvents = 'none'

			rightSide.style.userSelect = 'none'
			rightSide.style.pointerEvents = 'none'
		}

		const touchMoveHandler = function (e) {
			// How far the mouse has been moved
			const dx = e.targetTouches[0].clientX - x

			let newLeftWidth =
				((leftWidth + dx) * 100) /
				resizer.parentNode.getBoundingClientRect().width
			newLeftWidth = Math.max(newLeftWidth, 0)
			newLeftWidth = Math.min(newLeftWidth, 100)

			leftSide.style.width = `${newLeftWidth}%`
			resizer.style.left = `${newLeftWidth}%`

			resizer.style.cursor = 'col-resize'
			resizer.parentNode.style.cursor = 'col-resize'

			leftSide.style.userSelect = 'none'
			leftSide.style.pointerEvents = 'none'

			rightSide.style.userSelect = 'none'
			rightSide.style.pointerEvents = 'none'
		}

		const touchUpHandler = function () {
			resizer.style.removeProperty('cursor')
			resizer.parentNode.style.removeProperty('cursor')

			leftSide.style.removeProperty('user-select')
			leftSide.style.removeProperty('pointer-events')

			rightSide.style.removeProperty('user-select')
			rightSide.style.removeProperty('pointer-events')

			// Remove the handlers of `mousemove` and `mouseup`
			document.removeEventListener('touchmove', touchMoveHandler, false)
			document.removeEventListener('touchstart', touchUpHandler, false)
		}

		const mouseUpHandler = function () {
			resizer.style.removeProperty('cursor')
			resizer.parentNode.style.removeProperty('cursor')

			leftSide.style.removeProperty('user-select')
			leftSide.style.removeProperty('pointer-events')

			rightSide.style.removeProperty('user-select')
			rightSide.style.removeProperty('pointer-events')

			// Remove the handlers of `mousemove` and `mouseup`
			document.removeEventListener('mousemove', mouseMoveHandler)
			document.removeEventListener('mouseup', mouseUpHandler)
		}

		// Attach the handler
		resizer.addEventListener('mousedown', mouseDownHandler)
		resizer.addEventListener('touchstart', touchDownHandler, false)
	}
}

initComparisons()
