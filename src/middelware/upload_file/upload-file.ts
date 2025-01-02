import multer from "multer";
import dotenv from "dotenv";
import { CONFIG } from "../../config/config";

dotenv.config();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, CONFIG.app.imagePath.path);
  },
  filename: (_req, file, cb) => {
    const extent = file.originalname.split(".").pop(); // image.png ---> png
    cb(null, `${Date.now()}.${extent}`);
  },
});

export const upload = multer({ storage: storage });
