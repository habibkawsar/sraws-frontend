import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiErrorMessage } from '../api/http';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('requestor@test.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-hero">
        <span className="eyebrow">Enterprise workflow</span>
        <h1>Approve sponsorships with clean accountability.</h1>
        <p>Draft, route, approve, reject, and audit every sponsorship request from one role-aware workspace.</p>
      </section>
      <form className="login-card" onSubmit={submit}>
        <h2>Sign in</h2>
        {error && <div className="alert">{error}</div>}
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button disabled={busy}>{busy ? 'Signing in...' : 'Login'}</button>
        <div className="demo-users">
          <strong>Demo users</strong>
          <span>requestor@test.com</span>
          <span>manager@test.com</span>
          <span>finance@test.com</span>
          <span>admin@test.com</span>
        </div>
      </form>
    </main>
  );
}
