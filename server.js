const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send("hello world!!!");
});

app.listen(80, () => {
  console.log("server listening port:80");
});
