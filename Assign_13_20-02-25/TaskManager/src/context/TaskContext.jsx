import React, { createContext, useReducer, useContext, useMemo, useCallback } from "react";




const initialState = [];

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.value, completed: false }];
    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.value);
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.value ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = useCallback(text => {
    dispatch({ type: 'ADD_TASK', value: text });
  }, []);

  const removeTask = useCallback(id => {
    dispatch({ type: 'REMOVE_TASK', value: id });
  }, []);

  const toggleTask = useCallback(id => {
    dispatch({ type: 'TOGGLE_TASK', value: id });
  }, []);

  const completedTasksCount = useMemo(() => state.filter(task => task.completed).length, [state]);

  return (
    <TaskContext.Provider value={{ state, addTask, removeTask, toggleTask, completedTasksCount }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom Hook for using TaskContext
export const useTasks = () => useContext(TaskContext);
