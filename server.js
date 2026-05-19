const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get("/", function (req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.use(function (req, res) {
  res.status(404).sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, function () {
  console.log("ByteRush server running on port " + PORT);
});
