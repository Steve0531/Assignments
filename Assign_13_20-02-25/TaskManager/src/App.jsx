import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App = () => (
  <TaskProvider>
    <TaskForm />
    <TaskList />
  </TaskProvider>
);

export default App;
