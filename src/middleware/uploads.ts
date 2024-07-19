import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });
const multiFileUploadMiddleware = multerUpload.array('file', 5);

const uploadToCloudinary = async (dataURI: string) => {
  const result = await cloudinary.uploader.upload(dataURI, {
    resource_type: 'auto',
  });
  return result;
};

const executeMiddleware = (
  req: Request,
  res: Response,
  middleware: (req: Request, res: Response, next: NextFunction) => void
) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const processFileUploads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {  
  try {
    await executeMiddleware(req, res, multiFileUploadMiddleware);

    if (!req.files) {
      req.files = [];
    }

    const responses = await Promise.all(
      (req.files as Express.Multer.File[]).map(
        async (file: Express.Multer.File) => {
          const b64 = Buffer.from(file.buffer).toString('base64');
          const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
          return uploadToCloudinary(dataURI);
        }
      )
    );

    req.body.files = responses;
    next();
  } catch (error) {
    next(error);
  }
};

export default processFileUploads;
