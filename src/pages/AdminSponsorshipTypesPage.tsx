import { FormEvent, useEffect, useState } from 'react';
import { getApiErrorMessage } from '../api/http';
import { sponsorshipTypesApi } from '../api/sponsorshipTypesApi';
import type { SponsorshipType } from '../types';

export function AdminSponsorshipTypesPage() {
  const [types, setTypes] = useState<SponsorshipType[]>([]);
  const [editing, setEditing] = useState<SponsorshipType | null>(null);
  const [form, setForm] = useState({ name: '', description: '', isActive: true });
  const [error, setError] = useState('');

  const load = async () => setTypes(await sponsorshipTypesApi.list(true));
  useEffect(() => { load().catch((err) => setError(getApiErrorMessage(err))); }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (editing) await sponsorshipTypesApi.update(editing.id, form);
      else await sponsorshipTypesApi.create(form);
      setEditing(null);
      setForm({ name: '', description: '', isActive: true });
      await load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <section className="page-stack">
      <div className="page-title"><h2>Sponsorship type management</h2><p>Create, activate, deactivate, and maintain request categorization.</p></div>
      {error && <div className="alert">{error}</div>}
      <div className="admin-grid">
        <form className="card form-grid single" onSubmit={submit}>
          <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <label className="checkbox"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active</label>
          <button>{editing ? 'Update type' : 'Create type'}</button>
        </form>
        <div className="table-card">
          <table><thead><tr><th>Name</th><th>Status</th><th>Actions</th></tr></thead><tbody>
            {types.map((type) => <tr key={type.id}><td>{type.name}</td><td>{type.isActive ? 'Active' : 'Inactive'}</td><td><button className="secondary" onClick={() => { setEditing(type); setForm({ name: type.name, description: type.description ?? '', isActive: type.isActive }); }}>Edit</button></td></tr>)}
          </tbody></table>
        </div>
      </div>
    </section>
  );
}
