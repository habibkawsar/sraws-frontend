import { useEffect, useState } from 'react';
import { requestsApi } from '../api/requestsApi';
import { useAuth } from '../context/AuthContext';
import type { SponsorshipRequestListItem } from '../types';

export function DashboardPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<SponsorshipRequestListItem[]>([]);

  useEffect(() => {
  const load = async () => {
    if (!user) return;

    try {
      if (user.role === 'Requestor') {
        setRequests(await requestsApi.mine());
      }

      if (user.role === 'Manager') {
        setRequests(await requestsApi.pendingManager());
      }

      if (user.role === 'FinanceAdmin') {
        setRequests(await requestsApi.pendingFinance());
      }

      if (user.role === 'SystemAdmin') {
        setRequests(await requestsApi.all());
      }
    } catch (err) {
      console.error("Failed to load requests:", err);
      setRequests([]); // safe fallback
    }
  };

  load();
}, [user]);

  const approved = requests.filter((x) => x.status === 'Approved').length;
  const pending = requests.filter((x) => x.status.includes('Pending')).length;
  const rejected = requests.filter((x) => x.status === 'Rejected').length;

  return (
    <section className="page-stack">
      <div className="dashboard-hero">
        <div>
          <span className="eyebrow">Today’s workspace</span>
          <h2>{user?.role === 'Requestor' ? 'Your sponsorship pipeline' : 'Approvals needing attention'}</h2>
          <p>Use the side navigation to create, review, or administer requests based on your assigned role.</p>
        </div>
      </div>
      <div className="metric-grid">
        <article><span>Total</span><strong>{requests.length}</strong></article>
        <article><span>Pending</span><strong>{pending}</strong></article>
        <article><span>Approved</span><strong>{approved}</strong></article>
        <article><span>Rejected</span><strong>{rejected}</strong></article>
      </div>
    </section>
  );
}
