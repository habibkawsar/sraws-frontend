import { FormEvent, useEffect, useState } from 'react';
import { sponsorshipTypesApi } from '../api/sponsorshipTypesApi';
import type { SponsorshipRequestForm, SponsorshipType } from '../types';

const emptyForm: SponsorshipRequestForm = {
  requestTitle: '',
  department: '',
  sponsorshipTypeId: 0,
  eventOrOrganisationName: '',
  eventDate: '',
  requestedAmount: 0,
  purposeJustification: '',
  expectedBusinessBenefit: '',
  remarks: ''
};

export function RequestForm({ initialValue, onSubmit, submitLabel }: {
  initialValue?: Partial<SponsorshipRequestForm>;
  onSubmit: (value: SponsorshipRequestForm) => Promise<void>;
  submitLabel: string;
}) {
  const [form, setForm] = useState<SponsorshipRequestForm>({ ...emptyForm, ...initialValue });
  const [types, setTypes] = useState<SponsorshipType[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    sponsorshipTypesApi.list().then(setTypes);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      await onSubmit({ ...form, requestedAmount: Number(form.requestedAmount), sponsorshipTypeId: Number(form.sponsorshipTypeId) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label>Request title<input required maxLength={180} value={form.requestTitle} onChange={(e) => setForm({ ...form, requestTitle: e.target.value })} /></label>
      <label>Department<input required maxLength={120} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></label>
      <label>Sponsorship type<select required value={form.sponsorshipTypeId} onChange={(e) => setForm({ ...form, sponsorshipTypeId: Number(e.target.value) })}>
        <option value="">Select type</option>
        {types.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
      </select></label>
      <label>Event or organisation<input required maxLength={180} value={form.eventOrOrganisationName} onChange={(e) => setForm({ ...form, eventOrOrganisationName: e.target.value })} /></label>
      <label>Event date<input required type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} /></label>
      <label>Requested amount<input required min={1} type="number" value={form.requestedAmount} onChange={(e) => setForm({ ...form, requestedAmount: Number(e.target.value) })} /></label>
      <label className="span-2">Purpose justification<textarea required minLength={20} maxLength={2000} value={form.purposeJustification} onChange={(e) => setForm({ ...form, purposeJustification: e.target.value })} /></label>
      <label className="span-2">Expected business benefit<textarea required minLength={20} maxLength={2000} value={form.expectedBusinessBenefit} onChange={(e) => setForm({ ...form, expectedBusinessBenefit: e.target.value })} /></label>
      <label className="span-2">Remarks<textarea maxLength={1000} value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} /></label>
      <div className="span-2 form-actions"><button disabled={busy}>{busy ? 'Saving...' : submitLabel}</button></div>
    </form>
  );
}
