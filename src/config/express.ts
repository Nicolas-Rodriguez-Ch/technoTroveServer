import cors from 'cors';
import express, { Application, urlencoded } from 'express';
import morgan from 'morgan';

const configExpress = (app: Application): void => {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(urlencoded({ extended: true }));
  app.use(cors());
};

export default configExpress;
