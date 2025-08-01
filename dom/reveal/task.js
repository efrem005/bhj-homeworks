function initScrollReveal() {
	// Процент видимости элемента (0-1)
	const threshold = 0.1

	// Получаем все элементы с классом 'reveal'
	const elements = document.querySelectorAll('.reveal')

	// Функция для проверки, находится ли элемент в поле зрения
	const checkVisibility = () => {
		elements.forEach((el) => {
			const rect = el.getBoundingClientRect()
			const isVisible =
				rect.top <= window.innerHeight * (1 - threshold) &&
				rect.bottom >= 0

			el.classList.toggle('reveal_active', isVisible)
		})
	}

	// Проверить сразу при загрузке
	checkVisibility()

	// Добавляем обработчик события прокрутки
	window.addEventListener('scroll', checkVisibility)
}

// Вызываем функцию после полной загрузки страницы
window.addEventListener('DOMContentLoaded', initScrollReveal)