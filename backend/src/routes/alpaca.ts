import { AlpacaCredential } from './../../../node_modules/.pnpm/@prisma+client@5.19.1_prisma@5.19.1/node_modules/.prisma/client/index.d';
import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { encrypt } from "../utils/crypto";
import { prisma } from "../prisma";
import { validateAlpacaCredentials } from "../integrations/alpaca";

const router = Router();

router.post("/credentials", authMiddleware, async (req, res) => {
  const userId = (req as any).userId ;
  const { apiKey, secret, environment } = req.body;

  await validateAlpacaCredentials(apiKey, secret);

  await prisma.alpacaCredential.upsert({
    where: { userId_environment: { userId , environment } },
    update: {
      apiKeyEncrypted: encrypt(apiKey),
      apiSecretEncrypted: encrypt(secret),
    },
    create: {
      userId,
      apiKeyEncrypted: encrypt(apiKey),
      apiSecretEncrypted: encrypt(secret),
      environment
    },
  });

  res.json({ success: true });
});

export default router;
