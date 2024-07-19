import { PORT } from '../constants/secrets';
import configExpress from './config/express';
import express, { Express } from 'express';
import handleError from './middleware/handleError';
import routes from './routes';

const app: Express = express();

const port = PORT;

configExpress(app);

routes(app);
app.use(handleError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
