import { useState,useEffect } from "react";
import './Todo.css';

const TodoApp = () => {
    
    const [todos, setTodos] = useState<string[]>(() => {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    });
  
    const [newTask, setNewTask] = useState<string>(""); 
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editTask, setEditTask] = useState<string>("");
  
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
  
    const handleAddTodo = (): void => {
      setTodos([...todos, newTask]);
      setNewTask(""); 
    };
  
    const handleEditTodo = (index: number): void => {
      setEditIndex(index);
      setEditTask(todos[index]); 
    };
  
    const handleUpdateTodo = (index: number): void => {
      const updatedTodos = [...todos];
      updatedTodos[index] = editTask;
      setTodos(updatedTodos);
      setEditIndex(null);
      setEditTask("");
    };
  
    const handleDeleteTodo = (index: number): void => {
      setTodos(todos.filter((todo,i) => i !== index));
    };
  
    return (
    
      <div className="todo-container">
        <h1 className="title">Todo App</h1>
        <div className="input-container">
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter a task" />
          
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {editIndex === index ? (
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
              ) : (
                <span>{todo}</span>
              )}
              <div>
                {editIndex === index ? (
                  <button onClick={() => handleUpdateTodo(index)}>Update</button>
                ) : (
                  <button onClick={() => handleEditTodo(index)}>Edit</button>
                )}
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    
    );
  };
  
  export default TodoApp;
  