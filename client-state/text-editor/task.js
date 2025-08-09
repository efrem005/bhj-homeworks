// Константа для ключа localStorage
const TEXT_STORAGE_KEY = 'text'

// Получаем ссылку на элемент textarea
const editor = document.getElementById('editor')

// Сохраняет текущий текст редактора в localStorage
function saveText() {
	localStorage.setItem(TEXT_STORAGE_KEY, editor.value)
}

// Инициализирует редактор при загрузке страницы
function initEditor() {
	editor.value = localStorage.getItem(TEXT_STORAGE_KEY) || ''
}

// Когда DOM полностью загружен, инициализируем редактор
document.addEventListener('DOMContentLoaded', initEditor)

// Подписываемся на событие ввода (работает для любых изменений текста)
editor.addEventListener('input', saveText)