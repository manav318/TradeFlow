import { Router } from "express";
import { prisma } from "../prisma";
import { hashPassword, verifyPassword } from "../utils/password";
import { signJwt } from "../utils/jwt";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, passwordHash },
  });

  const token = signJwt({ userId: user.id });

  res.json({ token });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signJwt({ userId: user.id });

  res.json({ token });
});

export default router;
