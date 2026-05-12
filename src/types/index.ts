export type Role = 'Requestor' | 'Manager' | 'FinanceAdmin' | 'SystemAdmin';

export type WorkflowStatus =
  | 'Draft'
  | 'PendingManagerApproval'
  | 'PendingFinanceReview'
  | 'Approved'
  | 'Rejected'
  | 'Cancelled';

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  department: string;
  role: Role;
}

export interface LoginResponse {
  accessToken: string;
  expiresAtUtc: string;
  user: AuthUser;
}

export interface SponsorshipType {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface SponsorshipRequestForm {
  requestTitle: string;
  department: string;
  sponsorshipTypeId: number;
  eventOrOrganisationName: string;
  eventDate: string;
  requestedAmount: number;
  purposeJustification: string;
  expectedBusinessBenefit: string;
  remarks?: string;
}

export interface SponsorshipRequestListItem {
  id: number;
  requestTitle: string;
  requestorName: string;
  department: string;
  sponsorshipType: string;
  eventOrOrganisationName: string;
  eventDate: string;
  requestedAmount: number;
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalHistory {
  id: number;
  fromStatus?: WorkflowStatus;
  toStatus: WorkflowStatus;
  action: string;
  remarks?: string;
  actionBy: string;
  actionByRole: Role;
  actionAt: string;
}

export interface SponsorshipRequestDetail extends SponsorshipRequestListItem {
  sponsorshipTypeId: number;
  purposeJustification: string;
  expectedBusinessBenefit: string;
  remarks?: string;
  approvalHistories: ApprovalHistory[];
}
