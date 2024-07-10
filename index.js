import { app } from "./src/app.js";
import { CONFIG } from "./src/config.js";

const port = CONFIG.app.hostPort.port || 3000

app.listen(port, ()=>{
    console.log(`server listerning on port ${port}`);
})