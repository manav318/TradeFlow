import { producer } from "./producer";
import { WorkflowTriggerMessage } from "./contracts";

export async function publishWorkflowTrigger(
  message: WorkflowTriggerMessage
) {
  await producer.send({
    topic: "workflow-triggers",
    messages: [
      {
        key: message.workflowId,
        value: JSON.stringify(message),
      },
    ],
  });
}
