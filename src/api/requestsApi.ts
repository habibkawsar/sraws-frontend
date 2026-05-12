import { api } from './http';
import type { SponsorshipRequestDetail, SponsorshipRequestForm, SponsorshipRequestListItem } from '../types';

export const requestsApi = {
  async mine(): Promise<SponsorshipRequestListItem[]> {
    const response = await api.get<SponsorshipRequestListItem[]>('/requests/mine');
    return response.data;
  },
  async all(): Promise<SponsorshipRequestListItem[]> {
    const response = await api.get<SponsorshipRequestListItem[]>('/requests/all');
    return response.data;
  },
  async pendingManager(): Promise<SponsorshipRequestListItem[]> {
    const response = await api.get<SponsorshipRequestListItem[]>('/requests/pending-manager');
    return response.data;
  },
  async pendingFinance(): Promise<SponsorshipRequestListItem[]> {
    const response = await api.get<SponsorshipRequestListItem[]>('/requests/pending-finance');
    return response.data;
  },
  async get(id: number): Promise<SponsorshipRequestDetail> {
    const response = await api.get<SponsorshipRequestDetail>(`/requests/${id}`);
    return response.data;
  },
  async createDraft(payload: SponsorshipRequestForm): Promise<SponsorshipRequestDetail> {
    const response = await api.post<SponsorshipRequestDetail>('/requests', payload);
    return response.data;
  },
  async updateDraft(id: number, payload: SponsorshipRequestForm): Promise<SponsorshipRequestDetail> {
    const response = await api.put<SponsorshipRequestDetail>(`/requests/${id}`, payload);
    return response.data;
  },
  async submit(id: number): Promise<SponsorshipRequestDetail> {
    const response = await api.post<SponsorshipRequestDetail>(`/requests/${id}/submit`, {});
    return response.data;
  },
  async cancel(id: number, remarks?: string): Promise<SponsorshipRequestDetail> {
    const response = await api.post<SponsorshipRequestDetail>(`/requests/${id}/cancel`, { remarks });
    return response.data;
  },
  async managerApprove(id: number, remarks?: string): Promise<SponsorshipRequestDetail> {
    const response = await api.post<SponsorshipRequestDetail>(`/requests/${id}/manager/approve`, { remarks });
    return response.data;
  },
  async managerReject(id: number, remarks: string): Promise<SponsorshipRequestDetail> {
    const response = await api.post<SponsorshipRequestDetail>(`/requests/${id}/manager/reject`, { remarks });
    return response.data;
  },
  async financeApprove(id: number, remarks?: string): Promise<SponsorshipRequestDetail> {
    const response = await api.post<SponsorshipRequestDetail>(`/requests/${id}/finance/approve`, { remarks });
    return response.data;
  },
  async financeReject(id: number, remarks: string): Promise<SponsorshipRequestDetail> {
    const response = await api.post<SponsorshipRequestDetail>(`/requests/${id}/finance/reject`, { remarks });
    return response.data;
  }
};
