export interface WorkflowTriggerMessage {
  traceId: string;
  workflowId: string;
  userId: string;
  triggerType: "manual" | "schedule";
  triggeredAt: string;
}
