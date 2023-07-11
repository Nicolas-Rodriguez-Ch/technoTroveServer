import { Application } from "express";

import healthCheck from "./api/healthCheck";
import users from "./api/users";

const routes = (app: Application): void => {
  app.use("/api/healthCheck", healthCheck);
  app.use("/api/users", users);
};

export default routes;
