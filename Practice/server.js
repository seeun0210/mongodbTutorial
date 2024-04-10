const express = require("express");
const app = express();
app.use(express.json()); //express에서 json객체를 object로 바꿔주는 middleware
app.get("/", (req, res) => {
  return res.send("hello world!!!");
});
app.get("/user", (req, res) => {
  console.log(req);
});
app.post("/user", (req, res) => {
  return res.send({ success: true });
});
app.listen(80, () => {
  console.log("server listening port:80");
});
