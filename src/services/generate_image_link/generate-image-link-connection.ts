import { CONFIG } from "../../config/config";
import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: CONFIG.app.image.publicKey,
  privateKey: CONFIG.app.image.privateKey,
  urlEndpoint: CONFIG.app.image.urlEndpoint,
});
