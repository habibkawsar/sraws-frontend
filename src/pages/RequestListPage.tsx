import { useEffect, useState } from 'react';
import { getApiErrorMessage } from '../api/http';
import { requestsApi } from '../api/requestsApi';
import { RequestTable } from '../components/RequestTable';
import { useAuth } from '../context/AuthContext';
import type { SponsorshipRequestListItem } from '../types';

export function RequestListPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<SponsorshipRequestListItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        if (user?.role === 'Requestor') setRequests(await requestsApi.mine());
        if (user?.role === 'Manager') setRequests(await requestsApi.pendingManager());
        if (user?.role === 'FinanceAdmin') setRequests(await requestsApi.pendingFinance());
        if (user?.role === 'SystemAdmin') setRequests(await requestsApi.all());
      } catch (err) {
        setError(getApiErrorMessage(err));
      }
    };
    load();
  }, [user]);

  return (
    <section className="page-stack">
      <div className="page-title"><h2>Requests</h2><p>Role-filtered list of sponsorship workflow records.</p></div>
      {error && <div className="alert">{error}</div>}
      <RequestTable requests={requests} />
    </section>
  );
}
