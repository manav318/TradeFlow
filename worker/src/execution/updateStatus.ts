import { prisma } from "../prisma";

export async function markExecutionRunning(
  executionId: string
) {
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      status: "running",
      startedAt: new Date(),
    },
  });
}

export async function markExecutionSuccess(
  executionId: string
) {
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      status: "success",
      startedAt: new Date(),
    },
  });
}

export async function markExecutionFailed(
  executionId: string
) {
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      status: "failed",
      startedAt: new Date(),
    },
  });
}
