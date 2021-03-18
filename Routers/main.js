const express = require("express");
const router = express.Router();

const { signUp, logIn } = require("../controller/main");

router.post("/signUp", signUp);

router.post("/logIn", logIn);
