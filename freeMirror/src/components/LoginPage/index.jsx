import { useState } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const token = Cookies.get('token');
  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = () => {
    const userDetails = { email, password };
    const url = isLogin
      ? 'https://netfreebe.onrender.com/login'
      : 'https://netfreebe.onrender.com/register';

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    };

    fetch(url, options)
      .then((res) => (isLogin ? res.json() : res.text()))
      .then((res) => {
        if (isLogin) {
          if (res.token) {
            Cookies.set('token', res.token, { expires: 1 });
            navigate('/');
          } else {
            alert(res.message || 'Invalid credentials');
          }
        } else {
          alert(res);
        }
        setEmail('');
        setPassword('');
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong');
      });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="loginpage">
      <div className="loginbox">
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <div className="mailBox">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="passwordBox">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="register-button">
          <button className="register" onClick={handleSubmit}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span className="toggle-link" onClick={toggleMode}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
