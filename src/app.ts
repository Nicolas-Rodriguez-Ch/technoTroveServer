import express, { Express } from "express";
import configExpress from "./confg/express";
import routes from "./routes";

const app: Express = express();

configExpress(app);

routes(app);

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
