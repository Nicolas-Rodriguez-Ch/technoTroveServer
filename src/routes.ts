import { Application } from "express";

import healthCheck from "./api/healthCheck";
import users from "./api/users";
import authLocal from "./auth/local/index";
import projects from "./api/projects";

const routes = (app: Application): void => {
  app.use("/api/healthCheck", healthCheck);
  app.use("/api/users", users);
  app.use("/api/projects", projects);
  app.use("/auth/local", authLocal);
};

export default routes;
