let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const saved = localStorage.getItem("tasks");
	if (saved) {
		return JSON.parse(saved);
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	//const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	//const editButton = clone.querySelector(".to-do__item-button_type_edit");
	textElement.textContent = item;

	deleteButton.addEventListener("click", () => {
		clone.remove();
		const updatedTasks = getTasksFromDOM();
		saveTasks(updatedTasks);
	});

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];
	itemsNamesElements.forEach((el) => tasks.push(el.textContent));
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach((task) => {
	listElement.append(createItem(task));
});

formElement.addEventListener("submit", (event) => {
	event.preventDefault();

	const newTaskText = inputElement.value.trim();
	if (newTaskText === "") return;

	const newTaskElement = createItem(newTaskText);
	listElement.prepend(newTaskElement);

	inputElement.value = "";
});