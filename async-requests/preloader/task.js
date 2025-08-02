function loadCurrencyData() {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses')
	xhr.responseType = 'json'

	xhr.onload = function () {
		const loader = document.getElementById('loader')
		if (loader) loader.classList.remove('loader_active')

		if (xhr.status >= 200 && xhr.status < 300) {
			renderCurrencies(xhr.response)
		} else {
			console.error('Ошибка загрузки:', xhr.status, xhr.statusText)
		}
	}

	xhr.onerror = function () {
		console.error('Ошибка сети при выполнении запроса')
		const loader = document.getElementById('loader')
		if (loader) loader.classList.remove('loader_active')
	}

	xhr.send()
}

function renderCurrencies(response) {
	const itemsContainer = document.getElementById('items')
	if (!itemsContainer) return

	// Очищаем контейнер перед добавлением новых элементов
	itemsContainer.innerHTML = ''

	const currencies = Object.values(response.response.Valute)
	const fragment = document.createDocumentFragment()

	currencies.forEach(currency => {
		const itemElement = document.createElement('div')
		itemElement.className = 'item'
		itemElement.innerHTML = `
		<div class="item__code">${currency.CharCode}</div>
		<div class="item__value">${currency.Value}</div>
		<div class="item__currency">руб.</div>
	  `
		fragment.appendChild(itemElement)
	})

	itemsContainer.appendChild(fragment)
}

// Загружаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', loadCurrencyData)