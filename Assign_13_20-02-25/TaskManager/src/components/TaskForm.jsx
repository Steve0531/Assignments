import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import "../styles.css";

const TaskForm = () => {
  const { addTask } = useTasks();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new task..." />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
