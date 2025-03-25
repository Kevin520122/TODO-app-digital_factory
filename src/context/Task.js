import { createContext, useReducer } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
        loading: false
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload),
        loading: false
      };
    case 'SET_CURRENT':
      return {
        ...state,
        currentTask: action.payload
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        currentTask: null
      };
    case 'TASK_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [],
    currentTask: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Set axios auth header
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  // Get all tasks
  const getTasks = async () => {
    try {
      setAuthToken(localStorage.getItem('token'));
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.get('http://localhost:5000/api/tasks');
      dispatch({
        type: 'GET_TASKS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Error fetching tasks'
      });
    }
  };

  // Add task
  const addTask = async (task) => {
    try {
      setAuthToken(localStorage.getItem('token'));
      const res = await axios.post('http://localhost:5000/api/tasks', task);
      dispatch({
        type: 'ADD_TASK',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Error adding task'
      });
    }
  };

  // Update task
  const updateTask = async (task) => {
    try {
      setAuthToken(localStorage.getItem('token'));
      const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, task);
      dispatch({
        type: 'UPDATE_TASK',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Error updating task'
      });
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      setAuthToken(localStorage.getItem('token'));
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      dispatch({
        type: 'DELETE_TASK',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Error deleting task'
      });
    }
  };

  // Set current task
  const setCurrent = (task) => {
    dispatch({ type: 'SET_CURRENT', payload: task });
  };

  // Clear current task
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        currentTask: state.currentTask,
        error: state.error,
        loading: state.loading,
        getTasks,
        addTask,
        updateTask,
        deleteTask,
        setCurrent,
        clearCurrent
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;