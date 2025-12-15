import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "tradeflow-backend",
  brokers: [process.env.KAFKA_BROKER ?? "localhost:9092"],
});
