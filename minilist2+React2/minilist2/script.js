// 요소 선택
const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
const filterBtns = document.querySelectorAll(".filter-btn");

// 데이터 관리 배열
let todos = [];
let currentFilter = "all";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function addItem() {
  const text = todoInput.value.trim();

  if (text === "") return;
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  // Promise를 활용한 0.4초 지연 렌더링
  // 버튼을 잠시 비활성화하여 중복 클릭 방지
  addBtn.disabled = true;
  addBtn.textContent = "추가 중...";
  await delay(400);

  // 데이터 배열에 추가
  todos.push(newTodo);

  // 입력창 초기화
  todoInput.value = "";
  addBtn.disabled = false;
  addBtn.textContent = "추가";

  renderList(); // 전체 리스트 다시 그리기
}

//리스트 항목(DOM) 생성

function createListItem(todo) {
  const li = document.createElement("li");
  li.className = `todo-item ${todo.completed ? "done" : ""}`;
  li.dataset.id = todo.id;

  const span = document.createElement("span");
  span.textContent = todo.text;
  span.className = "todo-text";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.className = "delete-btn";

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

// filter() 활용해서 배열 데이터를 바탕으로 화면 렌더링
function renderList() {
  let filteredTodos = todos;

  if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  // 기존 리스트 초기화
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // 필터링된 데이터로 새 리스트 생성
  filteredTodos.forEach((todo) => {
    const listItem = createListItem(todo);
    todoList.appendChild(listItem);
  });
}

//이벤트 위임
function handleListClick(event) {
  const target = event.target;
  const li = target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  // 삭제 버튼 클릭 시
  if (target.classList.contains("delete-btn")) {
    todos = todos.filter((todo) => todo.id !== id);
    renderList();
  }
  // 리스트 항목 클릭 시 상태 변경
  else {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    renderList();
  }
}

// 필터 버튼 클릭
function handleFilterClick(event) {
  const filter = event.target.dataset.filter;
  if (!filter) return;

  // 필터 상태 변경 및 버튼 활성화 표시
  currentFilter = filter;
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  renderList();
}

// 이벤트 리스너 등록
addBtn.addEventListener("click", addItem);

// 이벤트 위임 (리스트 영역)
todoList.addEventListener("click", handleListClick);

// 이벤트 위임 (필터 버튼 영역)
document
  .querySelector(".filter-group")
  .addEventListener("click", handleFilterClick);

// 초기 렌더링
renderList();
