import { Application } from "express";

import healthCheck from "./api/healthCheck";

const routes = (app: Application): void => {
  app.use("/api/healthCheck", healthCheck);
};

export default routes;
