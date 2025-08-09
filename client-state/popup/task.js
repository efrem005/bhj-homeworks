document.addEventListener('DOMContentLoaded', function () {
	const modal = document.getElementById('subscribe-modal')
	const closeButton = document.querySelector('.modal__close')

	// Проверяем cookie при загрузке страницы
	if (!document.cookie.includes('modalClosed=true')) {
		modal.classList.add('modal_active')
	}

	// Обработчик закрытия модального окна
	closeButton.addEventListener('click', function () {
		modal.classList.remove('modal_active')
		// Устанавливаем cookie на 1 день
		document.cookie = 'modalClosed=true; max-age=86400; path=/'
	})
})