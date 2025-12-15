import axios from "axios";

export async function validateAlpacaCredentials(
  apiKey: string,
  secret: string
) {
  const res = await axios.get(
    `${process.env.ALPACA_BASE_URL}/v2/account`,
    {
      headers: {
        "APCA-API-KEY-ID": apiKey,
        "APCA-API-SECRET-KEY": secret,
      },
    }
  );

  if (!res.data.trading_blocked && res.data.status === "ACTIVE") {
    return true;
  }

  throw new Error("Invalid Alpaca account");
}
