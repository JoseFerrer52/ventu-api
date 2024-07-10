import multer from "multer";
import dotenv from "dotenv";
import { CONFIG } from "../../config.js";


dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, CONFIG.app.imagePath.path);
  },
  filename: (req, file, cb) => {
    const extent = file.originalname.split(".").pop(); // image.png ---> png
    cb(null, `${Date.now()}.${extent}`);
  },
});

export const upload = multer({ storage: storage });