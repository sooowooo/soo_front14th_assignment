const { useState } = React;

function TodoApp() {
  // 1. useState를 사용해 Todo 데이터를 상태로 관리
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("HIGH");
  const [filter, setFilter] = useState("all");

  const getFormattedDate = () => {
    const date = new Date();
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  // Todo 추가 핸들러
  const addItem = () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      done: false, // 'done' 속성 사용
      priority: priority,
      createdAt: getFormattedDate(),
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  // 2. 클릭 시 done 값이 true/false로 변경 (토글 기능)
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const deleteTodo = (e, id) => {
    e.stopPropagation(); // 부모 클릭 이벤트(toggle) 전파 방지
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 필터링 로직
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.done;
    if (filter === "active") return !todo.done;
    return true;
  });

  return (
    <main className="container">
      <h1>Mini List</h1>

      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="리스트를 입력하세요"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="HIGH">HIGH</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LOW">LOW</option>
        </select>
        <button onClick={addItem} id="addBtn">
          추가
        </button>
      </div>

      <div className="filter-group">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          전체 보기
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          완료 항목
        </button>
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          미완료 항목
        </button>
      </div>

      <ul id="todoList">
        {/* 3. map을 사용해 Todo 배열을 화면에 렌더링 */}
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.done ? "done" : ""}`}
            onClick={() => toggleTodo(todo.id)}
          >
            <div className="todo-info">
              <div>
                <span className={`priority-label priority-${todo.priority}`}>
                  [{todo.priority}]
                </span>
                {/* 4. 조건부 렌더링: 완료 시 체크 표시 아이콘 추가 */}
                <span className="todo-text">
                  {todo.done && <span className="check-icon">✔️ </span>}
                  {todo.text}
                </span>
              </div>
              <div className="todo-date">{todo.createdAt}</div>
            </div>
            <button
              className="delete-btn"
              onClick={(e) => deleteTodo(e, todo.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TodoApp />);
