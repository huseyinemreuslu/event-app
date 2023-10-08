const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const as = require("./seed");
const cors = require("cors");

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: ["http://localhost:3001"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
