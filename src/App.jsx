import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import AddForm from "./components/AddForm";
import List from "./components/List";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const changeChecked = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, checked: !prevTodo.checked }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    document.title = "Todo App";
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, changeChecked }}
    >
      <div className="w-full max-w-10xl mx-auto shadow-md rounded-lg px-3 py-3">
        <div>
          <h1 className="text-4xl font-bold text-center mb-8 mt-2">MY TODOS</h1>
          <div className="mb-4">
            <AddForm />
          </div>
          <div className="flex flex-wrap gap-y-3"></div>
          {todos.map((todo) => (
            <div key={todo.id} className="w-full">
              <List todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
