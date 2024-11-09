import { Router } from 'express';
import {
  deleteImage,
  getAllImages,
  getImageDetails,
  updateImage,
  uploadImage,
} from '../controller/image.js';
import upload from '../libs/multer.js';
const route = Router();

route.post('/image', upload.single('image'), uploadImage);
route.get('/images', getAllImages);
route.get('/image/:id', getImageDetails);
route.delete('/image/:id', deleteImage);
route.put('/image/:id', upload.single('image'), updateImage);

export default route;
