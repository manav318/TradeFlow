export interface WorkflowTriggerMessage {
  traceId: string;
  workflowId: string;
  userId: string;
  triggerType: "manual" | "schedule";
  triggeredAt: string;
}

export interface WorkflowExecutionMessage {
  traceId: string;
  executionId: string;
  workflowId: string;
  userId: string;
  mode: "paper" | "live";
  triggeredAt: string;
}
