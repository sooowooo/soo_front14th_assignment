import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import { todos } from "./data/todos";

function App() {
  return (
    <>
      <TodoHeader title="Todo List" />
      <TodoList sectionTitle="오늘 할 일" todos={todos} />
    </>
  );
}

export default App;
