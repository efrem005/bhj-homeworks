const CART_STORAGE_KEY = 'products'
const cartStorage = document.querySelector('.cart__products')

// Вспомогательные функции
const getProductData = (productElement) => {
	const id = productElement.dataset.id
	const image = productElement.querySelector('.product__image').src
	const count = parseInt(productElement.querySelector('.product__quantity-value').textContent)
	return { id, image, count }
}

// Создание карточки
const createCartProductElement = ({ id, image, count }) => {
	const cartProduct = document.createElement('div')
	cartProduct.classList.add('cart__product')
	cartProduct.dataset.id = id
	cartProduct.innerHTML = `
    <img class="cart__product-image" src="${image}">
    <div class="cart__product-count">${count}</div>
  `
	return cartProduct
}

// Обновление локального хранилища
const updateLocalStorage = () => {
	const products = Array.from(cartStorage.querySelectorAll('.cart__product')).map(product => ({
		id: product.dataset.id,
		image: product.querySelector('.cart__product-image').src,
		count: parseInt(product.querySelector('.cart__product-count').textContent)
	}))
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(products))
}

// Загрузка сохраненных продуктов из локального хранилища
const loadSavedProducts = () => {
	const savedProducts = localStorage.getItem(CART_STORAGE_KEY)
	if (!savedProducts) return

	JSON.parse(savedProducts).forEach(product => {
		cartStorage.appendChild(createCartProductElement(product))
	})
}

// Обработчики событий
const setupQuantityControls = () => {
	document.querySelectorAll('.product__quantity-controls').forEach(control => {
		const valueElement = control.querySelector('.product__quantity-value')
		const increment = () => valueElement.textContent = parseInt(valueElement.textContent) + 1
		const decrement = () => {
			const newValue = parseInt(valueElement.textContent) - 1
			valueElement.textContent = Math.max(newValue, 1)
		}

		control.querySelector('.product__quantity-control_inc').addEventListener('click', increment)
		control.querySelector('.product__quantity-control_dec').addEventListener('click', decrement)
	})
}


const setupAddToCartButtons = () => {
	document.querySelectorAll('.product__add').forEach(button => {
		button.addEventListener('click', ({ target }) => {
			const product = target.closest('.product')
			const { id, image, count } = getProductData(product)

			const existingProduct = cartStorage.querySelector(`.cart__product[data-id="${id}"]`)
			if (existingProduct) {
				const currentCount = parseInt(existingProduct.querySelector('.cart__product-count').textContent)
				existingProduct.querySelector('.cart__product-count').textContent = currentCount + count
			} else {
				cartStorage.appendChild(createCartProductElement({ id, image, count }))
			}

			updateLocalStorage()
		})
	})
}

// Инициализация
window.addEventListener('DOMContentLoaded', () => {
	loadSavedProducts()
	setupQuantityControls()
	setupAddToCartButtons()
})