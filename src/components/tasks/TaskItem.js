import { useContext } from 'react';
import TaskContext from '../../context/Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faHourglass } from '@fortawesome/free-solid-svg-icons';

const TaskItem = ({ task }) => {
  const { deleteTask, setCurrent, updateTask } = useContext(TaskContext);
  
  const { _id, title, description, completed } = task;
  
  const onDelete = () => {
    deleteTask(_id);
  };
  
  const onEdit = () => {
    setCurrent(task);
  };
  
  const toggleComplete = () => {
    updateTask({ ...task, completed: !completed });
  };
  
  return (
    <div className={`card mb-3 ${completed ? 'border-success' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className={`card-title ${completed ? 'text-decoration-line-through text-muted' : ''}`}>
            {title}
          </h5>
          <div>
            <button
              className={`btn btn-sm ${completed ? 'btn-success' : 'btn-outline-success'} me-1`}
              onClick={toggleComplete}
            >
              <FontAwesomeIcon icon={completed ? faCheck : faHourglass} />
            </button>
            <button 
              className="btn btn-sm btn-outline-primary me-1" 
              onClick={onEdit}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button 
              className="btn btn-sm btn-outline-danger" 
              onClick={onDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        
        {description && (
          <p className={`card-text mt-2 ${completed ? 'text-muted' : ''}`}>
            {description}
          </p>
        )}
        
        <div className="text-muted small mt-2">
          {completed ? 'Completed' : 'Pending'}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;