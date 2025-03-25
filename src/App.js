import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import { TaskProvider } from './context/Task';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;