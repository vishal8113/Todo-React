import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
const AddForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const insert = (e) => {
    e.preventDefault();

    if (!todo) {
      return;
    }

    addTodo({ todo, checked: false });
    setTodo("");
  };
  return (
    <form className="flex" onSubmit={insert}>
      <input
        className="w-full border border-black/10 rounded-1-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        type="text"
        placeholder="Enter Task.."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-blue-400 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
};

export default AddForm;
