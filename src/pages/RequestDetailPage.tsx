import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApiErrorMessage } from '../api/http';
import { requestsApi } from '../api/requestsApi';
import { StatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import type { SponsorshipRequestDetail } from '../types';

export function RequestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const [request, setRequest] = useState<SponsorshipRequestDetail | null>(null);
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');

  const load = async () => setRequest(await requestsApi.get(Number(id)));

  useEffect(() => {
    load().catch((err) => setError(getApiErrorMessage(err)));
  }, [id]);

  const act = async (action: () => Promise<SponsorshipRequestDetail>) => {
    try {
      setError('');
      setRequest(await action());
      setRemarks('');
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  if (!request) return <div className="empty-state">Loading request...</div>;

  return (
    <section className="page-stack">
      <div className="detail-header">
        <div><h2>{request.requestTitle}</h2><p>{request.eventOrOrganisationName}</p></div>
        <StatusBadge status={request.status} />
      </div>
      {error && <div className="alert">{error}</div>}
      <div className="detail-grid">
        <article className="card"><span>Requestor</span><strong>{request.requestorName}</strong></article>
        <article className="card"><span>Department</span><strong>{request.department}</strong></article>
        <article className="card"><span>Type</span><strong>{request.sponsorshipType}</strong></article>
        <article className="card"><span>Amount</span><strong>${request.requestedAmount.toLocaleString()}</strong></article>
      </div>
      <div className="card prose"><h3>Purpose</h3><p>{request.purposeJustification}</p><h3>Business benefit</h3><p>{request.expectedBusinessBenefit}</p><h3>Remarks</h3><p>{request.remarks || 'No requestor remarks.'}</p></div>
      <div className="card actions-panel">
        <textarea placeholder="Decision remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        <div className="button-row">
          {hasRole('Requestor') && request.status === 'Draft' && <button onClick={() => act(() => requestsApi.submit(request.id))}>Submit</button>}
          {hasRole('Requestor') && ['Draft', 'PendingManagerApproval'].includes(request.status) && <button className="secondary" onClick={() => act(() => requestsApi.cancel(request.id, remarks))}>Cancel</button>}
          {hasRole('Manager') && request.status === 'PendingManagerApproval' && <button onClick={() => act(() => requestsApi.managerApprove(request.id, remarks))}>Manager approve</button>}
          {hasRole('Manager') && request.status === 'PendingManagerApproval' && <button className="danger" onClick={() => act(() => requestsApi.managerReject(request.id, remarks))}>Manager reject</button>}
          {hasRole('FinanceAdmin') && request.status === 'PendingFinanceReview' && <button onClick={() => act(() => requestsApi.financeApprove(request.id, remarks))}>Final approve</button>}
          {hasRole('FinanceAdmin') && request.status === 'PendingFinanceReview' && <button className="danger" onClick={() => act(() => requestsApi.financeReject(request.id, remarks))}>Finance reject</button>}
          <button className="ghost-button" onClick={() => navigate('/requests')}>Back</button>
        </div>
      </div>
      <div className="card">
        <h3>Workflow history</h3>
        <div className="timeline">
          {request.approvalHistories.map((history) => (
            <div key={history.id}>
              <strong>{history.action}</strong>
              <span>{history.fromStatus ?? 'Start'} → {history.toStatus}</span>
              <p>{history.remarks}</p>
              <small>{history.actionBy} ({history.actionByRole}) on {new Date(history.actionAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
