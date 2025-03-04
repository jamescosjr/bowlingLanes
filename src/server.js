import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from "./src/application/controllers/routes.js";
import errorHandler from "./src/application/middleware/errorHandler.js";
import { validate } from 'express-jsonschema';
import yaml from 'js-yaml';
import fs from 'fs';

const schema = yaml.load(fs.readFileSync('./src/application/contracts/contract.yaml', 'utf8'));

dotenv.config();


export const app = express();
const PORT = process.env.PORT;

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI, {});

  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
  });
}

const validateSchema = (req, res, next) => {
  const validation = validate({ body: schema });
  validation(req, res, next);
};

app.use(validateSchema);

app.use(routes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}