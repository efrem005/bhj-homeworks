const progress = document.getElementById('progress')
const form = document.getElementById('form')

// Добавляем обработчик события отправки формы
form.addEventListener('submit', (e) => {
	// Предотвращаем стандартное поведение формы
	e.preventDefault()

	// Создаем новый объект XMLHttpRequest
	const xhr = new XMLHttpRequest()

	// Настраиваем запрос: метод POST, URL для отправки данных
	xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload')

	// Обработчик прогресса загрузки файла
	xhr.upload.onprogress = function (event) {
		// Проверяем, можно ли вычислить длину загружаемых данных
		if (event.lengthComputable) {
			// Добавляем размер загрузаемого файла
			progress.max = event.total
			// Обновляем значение прогресс-бара
			progress.value = event.loaded
		}
	}

	// Обработчик завершения запроса (успешного или неудачного)
	xhr.onloadend = function () {
		if (xhr.status === 200) {
			console.log('Успешная загрузка файла')
		} else {
			console.log(`Ошибка загрузки. Статус: ${xhr.status}`)
		}
	}

	// Обработчик ошибки сети
	xhr.onerror = function () {
		console.log('Произошла ошибка сети')
	}

	// Отправляем данные формы
	// FormData автоматически собирает все данные формы для отправки
	xhr.send(new FormData(form))
})