const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./Routers/user");
const mainRouter = require("./Routers/main");
const followRouter = require("./Routers/follow");

const app = express();
const port = process.env.PORT || 5000;
app.use(
  morgan(":method :url :status :res[header] :req[header] :response-time ms")
);

app.use(
  session({
    secret: "@A!B$",
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: "localhost",
      path: "/",
      maxAge: 24 * 3600 * 1000,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    },
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTION"],
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/main", mainRouter);
app.use("/follow", followRouter);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Connect Successfully" });
});

app.listen(port, () => {
  console.log("Server on port " + port);
});
