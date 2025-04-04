require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./application/controllers/routes.js");
const errorHandler = require("./middleware/errorHandler.js");
// const { validate } = require("express-jsonschema");
// const yaml = require("js-yaml");
// const fs = require("fs");
// const path = require("path");
// const { fileURLToPath } = ("url");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const schema = yaml.load(fs.readFileSync(path.join(__dirname, "./contracts/contract.yaml"), "utf8"));

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.MONGODB_URI, {});

  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
  });
}

// const validateSchema = (req, res, next) => {
//   const validation = validate({
//     body: schema,
//   });
//   validation(req, res, next);
// }

// app.use(validateSchema);

app.use(routes);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
