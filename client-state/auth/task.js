// Получаем элементы DOM
const form = document.getElementById('signin__form')
const welcome = document.getElementById('welcome')
const signin = document.getElementById('signin')
const logoutBtn = document.getElementById('logout__btn')

// Обработчик отправки формы авторизации
const handleFormSubmit = (e) => {
	e.preventDefault()

	const formData = new FormData(form)
	const xhr = new XMLHttpRequest()

	// Настраиваем запрос
	xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth')
	xhr.responseType = 'json'

	// Обработчик успешного ответа
	xhr.onload = function () {
		if (xhr.response.success) {
			const userId = xhr.response.user_id
			// Сохраняем ID пользователя в localStorage
			localStorage.setItem('userId', userId)
			// Показываем приветствие
			showWelcome(userId)
		} else {
			alert('Неверный логин или пароль')
		}
	}

	// Отправляем данные формы
	xhr.send(formData)
	form.reset()
}

// Показывает приветствие пользователя
const showWelcome = (userId) => {
	// Скрываем форму авторизации
	signin.classList.remove('signin_active')
	// Показываем блок приветствия
	welcome.classList.add('welcome_active')
	// Устанавливаем ID пользователя в текст
	welcome.querySelector('#user_id').textContent = userId
}

// Обработчик выхода из системы
const handleLogout = () => {
	// Удаляем ID пользователя
	localStorage.removeItem('userId')
	// Показываем форму авторизации
	signin.classList.add('signin_active')
	// Скрываем приветствие
	welcome.classList.remove('welcome_active')
}

// Проверяет авторизацию при загрузке страницы
const checkAuthOnLoad = () => {
	const userId = localStorage.getItem('userId')
	if (userId) {
		showWelcome(userId)
	}
}

// Назначаем обработчики событий
form.addEventListener('submit', handleFormSubmit)
logoutBtn.addEventListener('click', handleLogout)
window.addEventListener('DOMContentLoaded', checkAuthOnLoad)