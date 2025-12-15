export function getMassiveHeaders() {
  const apiKey = process.env.MASSIVE_API_KEY;

  if (!apiKey) {
    throw new Error("MASSIVE_API_KEY is not defined");
  }

  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}
