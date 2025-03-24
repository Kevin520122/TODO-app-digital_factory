import { useState, useContext, useEffect } from 'react';
import TaskContext from '../../context/Task';

const TaskForm = () => {
  const { addTask, updateTask, clearCurrent, currentTask } = useContext(TaskContext);
  
  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false
  });
  
  useEffect(() => {
    if (currentTask !== null) {
      setTask(currentTask);
    } else {
      setTask({
        title: '',
        description: '',
        completed: false
      });
    }
  }, [currentTask]);
  
  const { title, description } = task;
  
  const onChange = e => setTask({ ...task, [e.target.name]: e.target.value });
  
  const onSubmit = e => {
    e.preventDefault();
    
    if (title.trim() === '') return;
    
    if (currentTask === null) {
      addTask(task);
    } else {
      updateTask(task);
    }
    
    setTask({
      title: '',
      description: '',
      completed: false
    });
    
    clearCurrent();
  };
  
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title text-center">
          {currentTask ? 'Edit Task' : 'Add Task'}
        </h3>
        
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={onChange}
              rows="3"
            ></textarea>
          </div>
          
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              {currentTask ? 'Update Task' : 'Add Task'}
            </button>
            
            {currentTask && (
              <button 
                type="button" 
                className="btn btn-light"
                onClick={() => clearCurrent()}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;