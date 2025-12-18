import { ExecutionContext } from './utils/types';
import { runWorkflow } from "./execution/runner";
import { markExecutionFailed, markExecutionRunning } from "./execution/updateStatus";
import { consumer } from "./kafka/consumer";

async function startWorker() {
  console.log("Worker starting...");

  await consumer.connect();
  console.log("Kafka consumer connected");

  await consumer.subscribe({
  topic: "workflow-executions",
  fromBeginning: false,
});


  console.log("Subscribed to workflow-executions");

  await consumer.run({
    eachMessage: async ({ message }) => {
  if (!message.value) return;

  const payload = JSON.parse(message.value.toString());
  console.log("Execution received:", payload);
  await markExecutionRunning(payload.executionId);

  try{
      const {nodeIds,adjacency,executionOrder}=await runWorkflow(payload);

      const context={
        executionId:payload.executionId,
        userId: payload.userId,
      } as ExecutionContext;

      console.log(nodeIds,adjacency,executionOrder);

  }
  catch(err)
  {

    console.log(err);
    await markExecutionFailed(payload.executionId);
  }
}

  });
}

startWorker().catch((err) => {
  console.error("Worker crashed", err);
  process.exit(1);
});
