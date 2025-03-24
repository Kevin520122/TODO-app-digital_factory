import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/Auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    
    if (error) {
      setFormErrors({ ...formErrors, general: error });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);
  
  const { email, password } = formData;
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    
    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    }
    
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const onSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      login({ email, password });
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              
              {formErrors.general && (
                <div className="alert alert-danger">{formErrors.general}</div>
              )}
              
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                  {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              
              <div className="mt-3 text-center">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;