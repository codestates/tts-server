const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./Routers/user");
const mainRouter = require("./Routers/main");
const followRouter = require("./Routers/follow");

// const controllers = require("./controllers/links");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  morgan(":method :url :stauts :res[content-length] - :response-times ms")
);

app.use(
  session({
    secret: "@A!B$",
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: "*",
      path: "/*",
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
    credentials: true,
  })
);

app.use(express.json());

app.use("/", router);
app.use("/user", userRouter);
app.use("/main", mainRouter);
app.use("/follow", followRouter);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Connect Successfully" });
});

app.listen(port, () => {
  console.log("Server on port " + port);
});

module.exports = app;
