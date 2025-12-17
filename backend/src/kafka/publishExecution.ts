import { producer } from "./producer";
import { WorkflowExecutionMessage } from "./contracts";

export async function publishExecution(
  message: WorkflowExecutionMessage
) {
  await producer.send({
    topic: "workflow-executions",
    messages: [
      {
        key: message.executionId,
        value: JSON.stringify(message),
      },
    ],
  });
}
