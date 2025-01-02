import { CONFIG } from "../../config/config";

const configApiMail = {
  user: CONFIG.app.mailService.user,
  clientId: CONFIG.app.mailService.clientId,
  clientSecret: CONFIG.app.mailService.clientSecret,
  refreshToken: CONFIG.app.mailService.refreshToken,
};

export { configApiMail };
