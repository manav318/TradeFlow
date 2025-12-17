import { prisma } from "../prisma";



export async function createWorkflowExecution(
  workflowId: string,
  userId: string
) {
  return prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: "queued",
    },
  });
}
