import { api } from './http';
import type { SponsorshipType } from '../types';

export const sponsorshipTypesApi = {
  async list(includeInactive = false): Promise<SponsorshipType[]> {
    const response = await api.get<SponsorshipType[]>('/sponsorship-types', { params: { includeInactive } });
    return response.data;
  },
  async create(payload: Omit<SponsorshipType, 'id'>): Promise<SponsorshipType> {
    const response = await api.post<SponsorshipType>('/sponsorship-types', payload);
    return response.data;
  },
  async update(id: number, payload: Omit<SponsorshipType, 'id'>): Promise<SponsorshipType> {
    const response = await api.put<SponsorshipType>(`/sponsorship-types/${id}`, payload);
    return response.data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/sponsorship-types/${id}`);
  }
};
