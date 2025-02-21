import React from "react";
import { useTasks } from "../context/TaskContext";
import "../styles.css"; // Import CSS file

const TaskList = () => {
  const { state, removeTask, toggleTask, completedTasksCount } = useTasks();

  return (
    <div className="task-container">
      <h2>Task Manager</h2>
      <h3>Completed Tasks: {completedTasksCount}</h3>
      <ul className="task-list">
        {state.map(task => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            {task.text}
            <div>
              <button className="toggle-btn" onClick={() => toggleTask(task.id)}>✔</button>
              <button className="remove-btn" onClick={() => removeTask(task.id)}>✖</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
