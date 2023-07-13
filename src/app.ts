import express, { Express } from "express";
import configExpress from "./confg/express";
import routes from "./routes";
import { PORT } from "../constants/secrets";
import handleError from "./middleware/handleError";

const app: Express = express();

const port = PORT;

configExpress(app);

routes(app);
app.use(handleError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
