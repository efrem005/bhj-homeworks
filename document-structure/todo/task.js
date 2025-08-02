const TaskManager = {
	// Конфигурация
	config: {
		taskStorageKey: 'tasks',
		selectors: {
			inputTask: '#task__input',
			addTaskButton: '.tasks__add',
			taskList: '.tasks__list',
			taskItem: '.task',
			taskTitle: '.task__title',
			taskRemove: '.task__remove'
		}
	},

	// Инициализация приложения
	init() {
		this.cacheElements()
		this.setupEventListeners()
		this.loadTasks()
	},

	// Кэширование DOM элементов
	cacheElements() {
		this.elements = {
			inputTask: document.querySelector(this.config.selectors.inputTask),
			addTaskButton: document.querySelector(this.config.selectors.addTaskButton),
			taskList: document.querySelector(this.config.selectors.taskList)
		}
	},

	// Настройка обработчиков событий
	setupEventListeners() {
		this.elements.inputTask.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				this.addTask()
			}
		})

		this.elements.addTaskButton.addEventListener('click', (event) => {
			event.preventDefault()
			this.addTask()
		})

		this.elements.taskList.addEventListener('click', (event) => {
			if (event.target.classList.contains(this.config.selectors.taskRemove.slice(1))) {
				this.removeTask(event.target)
			}
		})
	},

	// Загрузка задач из localStorage
	loadTasks() {
		const savedTasks = localStorage.getItem(this.config.taskStorageKey)
		if (!savedTasks) return

		try {
			const tasks = JSON.parse(savedTasks)
			tasks.forEach(task => this.renderTask(task))
		} catch (error) {
			console.error('Ошибка при загрузке задач:', error)
		}
	},

	// Добавление новой задачи
	addTask() {
		const taskText = this.elements.inputTask.value.trim()
		if (!taskText) return

		this.renderTask(taskText)
		this.elements.inputTask.value = ''
		this.saveTasks()
	},

	// Удаление задачи
	removeTask(taskRemoveButton) {
		const taskElement = taskRemoveButton.closest(this.config.selectors.taskItem)
		if (taskElement) {
			taskElement.remove()
			this.saveTasks()
		}
	},

	// Сохранение задач в localStorage
	saveTasks() {
		const tasks = []
		document.querySelectorAll(this.config.selectors.taskItem).forEach(taskElement => {
			const title = taskElement.querySelector(this.config.selectors.taskTitle).textContent.trim()
			tasks.push(title)
		})

		localStorage.setItem(this.config.taskStorageKey, JSON.stringify(tasks))
	},

	// Отрисовка задачи в DOM
	renderTask(taskText) {
		const taskElement = document.createElement('div')
		taskElement.className = 'task'
		taskElement.innerHTML = `
            <div class="task__title">${taskText}</div>
            <a href="#" class="task__remove">&times;</a>
        `
		this.elements.taskList.appendChild(taskElement)
	}
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => TaskManager.init())