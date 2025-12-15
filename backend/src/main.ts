import express from 'express'
import { ensureTopics } from "./kafka/admin";
import { initProducer } from './kafka/producer';
import { publishWorkflowTrigger } from './kafka/publishTrigger';
import crypto from 'crypto';

async function bootstrap() {

  await new Promise((res) => setTimeout(res, 3000));

  await ensureTopics();

  await initProducer();
  
  const app = express()

  app.get('/', (_, res) => {
  res.send('Backend running')
})
  
  app.post('/test/kafka', async (req, res) => {
    await publishWorkflowTrigger({
  traceId: crypto.randomUUID(),
  workflowId: "test-workflow",
  userId: "test-user",
  triggerType: "manual",
  triggeredAt: new Date().toISOString(),
});

  res.json({ok:true})
  })

  app.listen(3001, () => {
  console.log('Backend listening on port 3001')
})
}

bootstrap();



