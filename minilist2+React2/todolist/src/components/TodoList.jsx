import TodoItem from "./TodoItem";

function TodoList({ sectionTitle, todos }) {
  return (
    <section>
      <h2>{sectionTitle}</h2>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} text={todo.text} />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
