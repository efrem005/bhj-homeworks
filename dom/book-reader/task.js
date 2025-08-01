// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
	const book = document.getElementById('book')

	// Обработчики для управления размером шрифта
	const fontSizeControls = document.querySelectorAll('.font-size')
	fontSizeControls.forEach(control => {
		control.addEventListener('click', function (e) {
			e.preventDefault() // Отменяем стандартное поведение ссылки

			// Удаляем активный класс у всех элементов управления размером
			fontSizeControls.forEach(c => c.classList.remove('font-size_active'))

			// Добавляем активный класс текущему элементу
			this.classList.add('font-size_active')

			// Получаем выбранный размер из data-атрибута
			const size = this.getAttribute('data-size')

			// Удаляем все классы размера шрифта
			book.classList.remove('book_fs-small', 'book_fs-big')

			// Добавляем нужный класс в зависимости от выбора
			if (size === 'small') {
				book.classList.add('book_fs-small')
			} else if (size === 'big') {
				book.classList.add('book_fs-big')
			}
		})
	})

	// Обработчики для управления цветом текста
	const textColorControls = document.querySelectorAll('.book__control_color .color')

	textColorControls.forEach(control => {
		control.addEventListener('click', function (e) {
			e.preventDefault()

			// Удаляем активный класс у всех элементов управления цветом текста
			textColorControls.forEach(c => {
				c.classList.remove('color_active')
			})

			// Добавляем активный класс текущему элементу
			this.classList.add('color_active')

			// Получаем выбранный цвет из data-атрибута
			const color = this.getAttribute('data-text-color')

			// Удаляем все классы цвета текста
			book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke')

			// Добавляем нужный класс цвета текста
			if (color) {
				book.classList.add(`book_color-${color}`)
			}
		})
	})

	// Обработчики для управления цветом фона
	const bgColorControls = document.querySelectorAll('.book__control_background .color')
	bgColorControls.forEach(control => {
		control.addEventListener('click', function (e) {
			e.preventDefault()

			// Удаляем активный класс у всех элементов управления цветом фона
			bgColorControls.forEach(c => {
				c.classList.remove('color_active')
			})

			// Добавляем активный класс текущему элементу
			this.classList.add('color_active')

			// Получаем выбранный цвет фона из data-атрибута
			const bg = this.getAttribute('data-bg-color')

			// Удаляем все классы цвета фона
			book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white')

			// Добавляем нужный класс цвета фона
			if (bg) {
				book.classList.add(`book_bg-${bg}`)
			}
		})
	})
})