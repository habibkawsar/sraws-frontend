import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Layout() {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">SR</div>
          <div>
            <strong>SRAWS</strong>
            <span>Approval Workflow</span>
          </div>
        </div>
        <nav>
          <NavLink to="/">Dashboard</NavLink>
          {hasRole('Requestor') && <NavLink to="/requests/new">Create Request</NavLink>}
          <NavLink to="/requests">Requests</NavLink>
          {hasRole('SystemAdmin') && <NavLink to="/admin/types">Sponsorship Types</NavLink>}
        </nav>
        <button className="ghost-button" onClick={signOut}>Sign out</button>
      </aside>
      <main className="main-panel">
        <header className="topbar">
          <div>
            <span className="eyebrow">{user?.role}</span>
            <h1>Sponsorship Request Approval</h1>
          </div>
          <div className="user-card">
            <strong>{user?.fullName}</strong>
            <span>{user?.department}</span>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}