require( 'dotenv' ).config()
require( './config/mongo.ts' )

import express from "express";
import path from "path";
import { connectToDatabase } from "./config/mongo";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import compression from "compression";

const MIMETYPES = ['image/jpeg', 'image/png'];

const multerUpload = multer({
  storage: multer.diskStorage({
      destination: path.join(__dirname, '../uploads'),
      filename: (_req, file, cb) => {
          const fileExtension = path.extname(file.originalname);
          const fileName = file.originalname.split(fileExtension)[0];

          cb(null, `${fileName}-${Date.now()}${fileExtension}`);
      },
  }),
  fileFilter: (_req, file, cb) => {
      if (MIMETYPES.includes(file.mimetype)) cb(null, true);
      else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
  },
  limits: {
      fieldSize: 10 * 1024 * 1024,
      fields: 20,
  },
});

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(compression());
app.use(cors());
app.use(morgan('dev'))

app.use('public', express.static(path.join(__dirname, '../uploads')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (_req, res) => {
  res.render('index');
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch(err => console.error(err));

app.post('/upload', multerUpload.single('file'), (req, res) => {
  console.log(req.file);

  res.sendStatus(200);
});