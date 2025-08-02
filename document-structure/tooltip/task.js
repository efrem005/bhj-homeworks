document.addEventListener('DOMContentLoaded', () => {
	const tooltipsLinks = Array.from(document.querySelectorAll('.has-tooltip'))
	const activeTooltips = new Set()

	tooltipsLinks.forEach(tooltipLink => {
		tooltipLink.addEventListener('click', (event) => {
			event.preventDefault()

			// Проверка и закрытие активного тултипа для текущей ссылки
			const activeTooltip = tooltipLink.querySelector('.tooltip_active')
			if (activeTooltip) {
				activeTooltip.remove()
				activeTooltips.delete(activeTooltip)
				return
			}

			// Закрытие лишних тултипов
			if (activeTooltips.size >= 1) {
				const oldestTooltip = activeTooltips.values().next().value
				oldestTooltip.remove()
				activeTooltips.delete(oldestTooltip)
			}

			// Создание нового тултипа
			const tooltip = document.createElement('div')
			tooltip.className = 'tooltip tooltip_active'
			tooltip.textContent = tooltipLink.title || tooltipLink.getAttribute('title')

			// Позиционирование тултипа
			const rect = tooltipLink.getBoundingClientRect()
			tooltip.style.top = `${rect.bottom + window.pageYOffset}px`
			tooltip.style.left = `${rect.left + window.pageXOffset}px`

			tooltipLink.appendChild(tooltip)
			activeTooltips.add(tooltip)
		})
	})

	// Закрытие тултипов при клике вне области
	document.addEventListener('click', (event) => {
		if (!event.target.closest('.has-tooltip')) {
			activeTooltips.forEach(tooltip => tooltip.remove())
			activeTooltips.clear()
		}
	})
})