import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import type { SponsorshipRequestListItem } from '../types';

export function RequestTable({ requests }: { requests: SponsorshipRequestListItem[] }) {
  if (!requests.length) {
    return <div className="empty-state">No requests found for this view.</div>;
  }

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Requestor</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td><Link to={`/requests/${request.id}`}>{request.requestTitle}</Link></td>
              <td>{request.requestorName}</td>
              <td>{request.sponsorshipType}</td>
              <td>${request.requestedAmount.toLocaleString()}</td>
              <td><StatusBadge status={request.status} /></td>
              <td>{new Date(request.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
