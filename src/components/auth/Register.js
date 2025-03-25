import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/Auth';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { register, isAuthenticated, error, clearErrors } = useContext(AuthContext);
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
  
  const { username, email, password, password2 } = formData;
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    
    if (!username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }
    
    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    if (password !== password2) {
      errors.password2 = 'Passwords do not match';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const onSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      register({ username, email, password });
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Register</h2>
              
              {formErrors.general && (
                <div className="alert alert-danger">{formErrors.general}</div>
              )}
              
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                    id="username"
                    name="username"
                    value={username}
                    onChange={onChange}
                  />
                  {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
                </div>
                
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
                
                <div className="mb-3">
                  <label htmlFor="password2" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${formErrors.password2 ? 'is-invalid' : ''}`}
                    id="password2"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                  />
                  {formErrors.password2 && <div className="invalid-feedback">{formErrors.password2}</div>}
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              
              <div className="mt-3 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;