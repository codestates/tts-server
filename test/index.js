const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const test = "사용하지 않는 변수";
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("연결성공");
});

app.listen(port, () => {
  console.log("server on port " + port);
});
