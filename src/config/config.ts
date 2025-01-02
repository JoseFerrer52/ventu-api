import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  app: {
    secret: {
      jwt: process.env.JWT_SECRET,
    },
    database: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
    },
    image: {
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY,
      urlEndpoint: process.env.URL_ENDPOINT,
    },
    imagePath: {
      path: process.env.IMAGE_UPLOAD_PATH,
    },
    hostPort: {
      port: process.env.HOST_PORT,
    },
    mailService: {
      type: process.env.TYPE,
      user: process.env.USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  },
};
