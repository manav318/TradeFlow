import { consumer } from "./kafka/consumer";

async function startWorker() {
  console.log("Worker starting...");

  await consumer.connect();
  console.log("Kafka consumer connected");

  await consumer.subscribe({
    topic: "workflow-triggers",
    fromBeginning: false,
  });

  console.log("Subscribed to workflow-triggers");

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const payload = JSON.parse(message.value.toString());
      console.log("Received trigger:", payload);
    },
  });
}

startWorker().catch((err) => {
  console.error("Worker crashed", err);
  process.exit(1);
});
