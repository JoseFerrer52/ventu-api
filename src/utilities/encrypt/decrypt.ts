import * as crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);

export function decrypt(text: { iv: string; encryptedData: string }) {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
