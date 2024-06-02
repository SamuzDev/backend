// multer.ts
import multer from 'multer';
import path from 'path';

const MIMETYPES = ['image/jpeg', 'image/png'];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (_req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = file.originalname.split(fileExtension)[0];
    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
});

const multerUpload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
    }
  },
  limits: {
    fieldSize: 10 * 1024 * 1024,
    fields: 20,
  },
});

export default multerUpload;