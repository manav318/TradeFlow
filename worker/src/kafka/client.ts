import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "tradeflow-worker",
  brokers: [process.env.KAFKA_BROKER ?? "localhost:9092"],
});
