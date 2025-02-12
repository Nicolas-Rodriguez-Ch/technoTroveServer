import { Application } from 'express';

import authLocal from './auth/local/index';
import healthCheck from './api/healthCheck';
import projects from './api/projects';
import users from './api/users';

const routes = (app: Application): void => {
  app.use('/api/healthCheck', healthCheck);
  app.use('/api/users', users);
  app.use('/api/projects', projects);

  app.use('/auth/local', authLocal);
};

export default routes;
