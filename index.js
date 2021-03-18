const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const indexRouter = require("./routes/index");

app.use(cors());
app.use(express.json());

app.get("/", indexRouter);

// (req, res) => {
//   res.status(200).send("연결성공");
// });

app.listen(port, () => {
  console.log("server on port " + port);
});
