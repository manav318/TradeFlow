import { Router } from "express";
import crypto from "crypto";
import { createWorkflowExecution } from "../workflows/execution.service";
import { publishExecution } from "../kafka/publishExecution";

const router = Router();

router.post("/workflows/:id/trigger", async (req, res) => {
  const workflowId = req.params.id;

  if(!req.body || !req.body.user_id ) {
    return res.status(401).json({ error: "Unauthorized user" });
  }
  const userId = req.body.user_id;
  const traceId = crypto.randomUUID();

  const execution = await createWorkflowExecution(
    workflowId,
    userId
  );

  await publishExecution({
    traceId,
    executionId: execution.id,
    workflowId,
    userId,
    mode: "paper",
    triggeredAt: new Date().toISOString(),
  });

  res.json({
    executionId: execution.id,
    status: "queued",
  });
});

export default router;
