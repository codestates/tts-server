const express = require("express");
const router = express.Router();

const { userInfo, record, logOut } = require("../controllers/user");
router.get("/userinfo", userInfo);

router.get("/record", record.get);

router.post("/record", record.post);

router.get("/logout", logOut);

module.exports = router;
