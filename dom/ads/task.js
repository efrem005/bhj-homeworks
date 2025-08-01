document.addEventListener('DOMContentLoaded', function () {
	const cases = document.querySelectorAll('.rotator__case')
	let currentIndex = 0
	let interval

	// Функция активации элемента
	function activateCase(element) {
		element.classList.add('rotator__case_active')
		element.style.color = element.dataset.color
	}

	// Функция запуска ротатора
	function startRotator(speed) {
		clearInterval(interval) // Очищаем предыдущий интервал
		interval = setInterval(() => {
			// Деактивируем текущий элемент
			cases[currentIndex].classList.remove('rotator__case_active')

			// Переходим к следующему элементу
			currentIndex = (currentIndex + 1) % cases.length

			// Активируем новый элемент
			activateCase(cases[currentIndex])

			// Обновляем интервал с новой скоростью
			const newSpeed = parseInt(cases[currentIndex].dataset.speed)
			startRotator(newSpeed)
		}, speed)
	}

	// Активируем первый элемент
	activateCase(cases[currentIndex])

	// Запускаем ротатор с начальной скоростью
	const initialSpeed = parseInt(cases[currentIndex].dataset.speed)
	startRotator(initialSpeed)
})