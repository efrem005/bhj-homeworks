
const poll = {
	// Инициализирует опрос
	init() {
		this.loadPollData()
	},

	// Загружает данные опроса с сервера

	loadPollData() {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll')
		xhr.responseType = 'json'

		// Обработчик успешной загрузки
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				this.handlePollData(xhr.response)
			} else {
				this.handleError(`Ошибка загрузки: ${xhr.statusText}`)
			}
		}

		// Обработчик ошибки сети
		xhr.onerror = () => {
			this.handleError('Ошибка сети при загрузке опроса')
		}

		xhr.send()
	},

	// Обрабатывает полученные данные опроса
	handlePollData(data) {
		// Получаем DOM-элементы
		const pollTitle = document.getElementById('poll__title')
		const pollAnswers = document.getElementById('poll__answers')

		// Очищаем предыдущие данные
		pollTitle.innerHTML = ''
		pollAnswers.innerHTML = ''

		// Устанавливаем заголовок опроса
		pollTitle.textContent = data.data.title

		// Создаем кнопки с вариантами ответов
		data.data.answers.forEach((answer, index) => {
			this.createAnswerButton(answer, index, data, pollAnswers)
		})
	},

	// Создает кнопку с вариантом ответа
	createAnswerButton(answer, index, pollData, container) {
		const button = document.createElement('button')
		button.className = 'poll__answer'
		button.textContent = answer

		// Добавляем обработчик клика
		button.addEventListener('click', () => {
			this.handleAnswerSelection(index, pollData)
		})

		container.appendChild(button)
	},

	// Обрабатывает выбор ответа пользователем
	handleAnswerSelection(answerIndex, pollData) {
		alert('Спасибо, Ваш голос засчитан!')
		this.sendVote(answerIndex, pollData.id)
	},

	// Отправляет голос на сервер
	sendVote(answerIndex, pollId) {
		const xhr = new XMLHttpRequest()
		xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll')
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		xhr.responseType = 'json'

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				this.displayVoteResults(xhr.response)
			} else {
				this.handleError('Ошибка при отправке голоса')
			}
		}

		xhr.onerror = () => {
			this.handleError('Ошибка сети при отправке голоса')
		}

		xhr.send(`vote=${pollId}&answer=${answerIndex}`)
	},

	// Отображает результаты голосования
	displayVoteResults(results) {
		const pollAnswers = document.getElementById('poll__answers')
		pollAnswers.innerHTML = '' // Очищаем кнопки

		// Считаем общее количество голосов
		const totalVotes = results.stat.reduce((sum, item) => sum + item.votes, 0)

		// Создаем элементы с процентами для каждого варианта
		results.stat.forEach(item => {
			const percentage = ((item.votes / totalVotes) * 100).toFixed(2)
			const resultElement = document.createElement('div')
			resultElement.className = 'poll__result'
			resultElement.innerHTML = `
		  ${item.answer}: <strong>${percentage}%</strong>
		`
			pollAnswers.appendChild(resultElement)
		})
	},

	// Обрабатывает ошибки
	handleError(message) {
		console.error(message)
		// В реальном приложении здесь можно показать пользователю сообщение об ошибке
	}
}

// Инициализируем опрос при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
	poll.init()
})