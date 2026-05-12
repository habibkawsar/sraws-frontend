import type { WorkflowStatus } from '../types';

export function StatusBadge({ status }: { status: WorkflowStatus }) {
  return <span className={`status status-${status}`}>{status.replace(/([A-Z])/g, ' $1').trim()}</span>;
}
