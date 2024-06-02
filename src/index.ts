require( 'dotenv' ).config()
require( './config/mongo.ts' )

import express from "express";
import { connectToDatabase } from "./config/mongo";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import postRoutes from "./modules/posts";
import { cwd } from "process";

const app = express();
const host = process.env.HOST || "localhost";
const protocol = process.env.PROTOCOL || "http";
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(compression());
app.use(cors());
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.get('/', (_req, res) => {
  res.sendFile(cwd() + '/views/index.html');
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on ${protocol}://${host}:${port}`);
    });
  })
  .catch(err => console.error(err));

app.use("/api/posts", postRoutes);