import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiErrorMessage } from '../api/http';
import { requestsApi } from '../api/requestsApi';
import { RequestForm } from '../components/RequestForm';
import type { SponsorshipRequestForm } from '../types';

export function CreateRequestPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const save = async (payload: SponsorshipRequestForm) => {
    try {
      const created = await requestsApi.createDraft(payload);
      navigate(`/requests/${created.id}`);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <section className="page-stack">
      <div className="page-title"><h2>Create sponsorship request</h2><p>Save the request as a draft, then submit it from the detail page.</p></div>
      {error && <div className="alert">{error}</div>}
      <div className="card"><RequestForm onSubmit={save} submitLabel="Save draft" /></div>
    </section>
  );
}
