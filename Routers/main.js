const express = require("express");
const router = express.Router();

const { signUp, logIn, oAuth } = require("../controllers/main");

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/oauth/accesstoken", oAuth.accessToken);

module.exports = router;
