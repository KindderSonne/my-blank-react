import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../data/mockData';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const authResult = authenticateUser(username, password);
      
      if (authResult.success) {
        // Store user data in localStorage for session management
        localStorage.setItem('user', JSON.stringify(authResult.user));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Navigate based on user role
        if (authResult.user.role === 'admin') {
          navigate('/admin');
        } else if (authResult.user.role === 'member') {
          navigate('/member');
        }
      } else {
        setError(authResult.message);
      }
    } catch (error) {
      setError('Có lỗi xảy ra trong quá trình đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Đăng Nhập</h2>
        <p className="login-subtitle">Task Management System</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>👤 Tên đăng nhập:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>🔑 Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? '🔄 Đang đăng nhập...' : '🚀 Đăng Nhập'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;