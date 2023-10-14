import multer from 'multer';
import { imagesMimetypes } from './image';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `./uploads`);
  },
  filename(req, file, cb) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if (!imagesMimetypes.includes(file.mimetype)) {
      return cb(
        new Error(
          'file is not allowed, only .png, .jpg and .jpeg format allowed!',
        ),
      );
    }
    return cb(null, true);
  },
});

export default upload;
