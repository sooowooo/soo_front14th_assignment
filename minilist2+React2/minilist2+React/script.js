const todoInput = document.querySelector("#todoInput");
const priorityInput = document.querySelector("#priorityInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
const filterBtns = document.querySelectorAll(".filter-btn");

let todos = [];
let currentFilter = "all";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

async function addItem() {
  const text = todoInput.value.trim();
  const priority = priorityInput.value;

  if (text === "") return;

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: priority,
    createdAt: getFormattedDate(),
  };

  addBtn.disabled = true;
  addBtn.textContent = "Adding..."; // 영문으로 변경하여 Helvetica 체감 극대화
  await delay(400);

  todos.push(newTodo);
  todoInput.value = "";
  addBtn.disabled = false;
  addBtn.textContent = "추가";

  renderList();
}

function createListItem(todo) {
  const li = document.createElement("li");
  li.className = `todo-item ${todo.completed ? "done" : ""}`;
  li.dataset.id = todo.id;

  const infoDiv = document.createElement("div");
  infoDiv.className = "todo-info";

  const titleDiv = document.createElement("div");

  const prioritySpan = document.createElement("span");
  prioritySpan.textContent = `[${todo.priority}] `;
  prioritySpan.className = `priority-label priority-${todo.priority}`;

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.className = "todo-text";

  titleDiv.appendChild(prioritySpan);
  titleDiv.appendChild(textSpan);

  const dateDiv = document.createElement("div");
  dateDiv.textContent = todo.createdAt;
  dateDiv.className = "todo-date";

  infoDiv.appendChild(titleDiv);
  infoDiv.appendChild(dateDiv);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.className = "delete-btn";

  li.appendChild(infoDiv);
  li.appendChild(deleteBtn);

  return li;
}

function renderList() {
  let filteredTodos = todos;
  if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  todoList.innerHTML = "";
  filteredTodos.forEach((todo) => {
    todoList.appendChild(createListItem(todo));
  });
}

function handleListClick(event) {
  const target = event.target;
  const li = target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (target.classList.contains("delete-btn")) {
    todos = todos.filter((todo) => todo.id !== id);
    renderList();
  } else {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    renderList();
  }
}

function handleFilterClick(event) {
  const filter = event.target.dataset.filter;
  if (!filter) return;
  currentFilter = filter;
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderList();
}

addBtn.addEventListener("click", addItem);
todoList.addEventListener("click", handleListClick);
document
  .querySelector(".filter-group")
  .addEventListener("click", handleFilterClick);

renderList();
