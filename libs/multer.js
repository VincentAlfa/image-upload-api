import multer from 'multer';

const upload = multer({
  fileFilter: (req, file, callback) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      const err = new Error('only PNG/JPG/JPEG');
      callback(err, false);
    }
  },
  onError: (err, next) => {
    next(err);
  },
});

export default upload;
