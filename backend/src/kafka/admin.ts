import { kafka } from "./client";

const admin = kafka.admin();

export async function ensureTopics() {
  await admin.connect();

  try
  {
  await admin.createTopics({
    waitForLeaders: true,
    topics: [
      { topic: "workflow-triggers", numPartitions: 1,replicationFactor: 1 },
      { topic: "workflow-executions", numPartitions: 1,replicationFactor: 1 },
      { topic: "dead-letter", numPartitions: 1,replicationFactor: 1 },
    ],
  });
}
catch(err:any)
{
    if(err.type=== 'TOPIC_ALREADY_EXISTS' || err.message?.includes('Topic already exists'))
        console.log('Kafka topics already exist, continuing...');
    else
        throw err;
}
finally
{
    await admin.disconnect();
}

  
}
