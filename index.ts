import { app } from "./src/app";
import { CONFIG } from "./src/config/config";

const port = CONFIG.app.hostPort.port || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
