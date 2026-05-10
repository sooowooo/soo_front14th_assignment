const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

function addItem() {
  const text = todoInput.value.trim();

  if (text === "") {
    return;
  }

  const listItem = createListItem(text);
  todoList.appendChild(listItem);

  todoInput.value = "";
  todoInput.focus();
}

function createListItem(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.className = "todo-text";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.className = "delete-btn";

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

function handleListClick(event) {
  const target = event.target;

  if (target.classList.contains("delete-btn")) {
    const li = target.closest("li");
    li.remove();
  } else {
    const li = target.closest("li");
    if (li) {
      li.classList.toggle("done");
    }
  }
}

addBtn.addEventListener("click", addItem);

todoList.addEventListener("click", handleListClick);
