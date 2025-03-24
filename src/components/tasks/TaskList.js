import { useContext, useEffect } from 'react';
import TaskContext from '../../context/Task';
import TaskItem from './TaskItem';
import Spinner from '../layout/Spinner';

const TaskList = () => {
  const { tasks, getTasks, loading } = useContext(TaskContext);
  
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);
  
  if (loading) {
    return <Spinner />;
  }
  
  if (tasks.length === 0) {
    return (
      <div className="text-center my-5">
        <h4>No tasks yet</h4>
        <p className="text-muted">Add a task to get started!</p>
      </div>
    );
  }
  
  return (
    <div>
      <h3 className="mb-4">Your Tasks</h3>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;