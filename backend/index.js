const express = require("express");

const app = express();

const router = require("./routes");

const bodyParser = require("body-parser");

const cors = require("cors");

const morgan = require("morgan");

const config = require("./config/app");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use(router);

const port = config.appPort;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
