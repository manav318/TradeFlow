import { kafka } from "./client";

export const consumer = kafka.consumer({
  groupId: "tradeflow-workers",
});
