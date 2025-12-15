import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function getJwtExpiry(): jwt.SignOptions["expiresIn"] {
    const value = process.env.JWT_EXPIRES_IN;
    if(!value)
        return "7D";
    const match = value.match(/^(\d+)([a-zA-Z]+)$/);

    if(!match)
        return "7D";
    return value as jwt.SignOptions["expiresIn"];


}

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: getJwtExpiry(),
  });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
