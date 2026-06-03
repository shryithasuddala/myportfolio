import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.brand}>FLEXI·FIT</div>
        <p className={styles.tagline}>Your AI-powered fitness coach</p>

        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.sub}>Log in to continue your journey</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className={styles.switch}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.link}>Create one</Link>
        </p>
      </div>

      <div className={styles.visual}>
        <div className={styles.visualInner}>
          <div className={styles.stat}><span className={styles.statNum}>14</span><span className={styles.statLabel}>Day streak</span></div>
          <div className={styles.stat}><span className={styles.statNum}>487</span><span className={styles.statLabel}>kcal today</span></div>
          <div className={styles.stat}><span className={styles.statNum}>22.4</span><span className={styles.statLabel}>BMI</span></div>
        </div>
        <p className={styles.visualCaption}>Powered by Llama 3 · MERN Stack</p>
      </div>
    </div>
  );
}
