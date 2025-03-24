import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';

const Home = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-4 mb-4 mb-lg-0">
          <TaskForm />
        </div>
        <div className="col-lg-8">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Home;