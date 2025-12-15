import crypto from "crypto";

const ENCRYPTION_KEY = process.env.JWT_SECRET!.slice(0, 32);

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(text),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}
