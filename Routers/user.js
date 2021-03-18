const express = require("express");
const router = express.Router();

const { userInfo, record, logOut } = require("../controller/user");
router.get("/userInfo", userInfo);

router.get("/record", record.get);

router.post("/record", record.post);

router.get("/logOut", logOut);
