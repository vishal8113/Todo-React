import { useTodo } from "../contexts/TodoContext";
import { useState } from "react";
const List = ({ todo }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, changeChecked } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsEditable(false);
  };

  const checkChange = () => {
    changeChecked(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap x-3 shadow-sm shadow-white/50 duration-300 text-black mb-3 ${
        todo.checked ? "bg-[#c6e9a7]" : "bg-[#ef6f6b]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.checked}
        onChange={checkChange}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg mx-3 ${
          isEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.checked ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 mx-3"
        onClick={() => {
          if (todo.checked) {
            return;
          }

          if (isEditable) {
            editTodo();
          } else {
            setIsEditable((prev) => !prev);
          }
        }}
        disabled={todo.checked}
      >
        {isEditable ? "✅" : "✏️"}
      </button>
      <button
        className="inline-flex w-12 h-8 rounded-lg text-sm border-black/10 justify-center items-center bg-gray-100 hover:bg-gray-200 shrink-0 disabled:opacity-50"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
};

export default List;
