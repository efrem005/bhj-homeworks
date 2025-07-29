const tabs = [...document.querySelectorAll('.tab')]
const tabContents = [...document.querySelectorAll('.tab__content')]

tabs.forEach((tab, index) => {
	// Ищем все элементы с классом tab и удаляем у них класс active
	tab.addEventListener('click', () => {
		tabs.forEach((tab) => {
			tab.classList.remove('tab_active')
		})
		// добавляем кликнутому элементу класс tab_active
		tab.classList.add('tab_active')
		// ищем все элементы с классом tab__content и удаляем у них класс active
		tabContents.forEach((content) => {
			if (content.classList.contains('tab__content_active')) {
				content.classList.remove('tab__content_active')
			}
			// присваиваем индекс кликнутого элемента массиву tabContents и добавляем класс tab__content_active этому индексу
			const activeIndexContent = tabContents[index]
			activeIndexContent.classList.add('tab__content_active')
		})
	})
})