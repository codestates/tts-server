const express = require("express");
const session = require("express-session");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
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
    origin: "https://localhost:3000",
    methods: ["GET", "POST", "OPTION"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/main", mainRouter);
app.use("/follow", followRouter);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Connect Successfully" });
});

let server;

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  server = https
    .createServer(
      {
        key: fs.readFileSync(__dirname + "/" + "key.pem", "utf-8"),
        cert: fs.readFileSync(__dirname + "/" + "cert.pem", "utf-8"),
      },
      app
    )
    .listen(port);
} else {
  server = app.listen(port, () => {
    console.log("Http Server on ");
  });
}

module.exports = server;
