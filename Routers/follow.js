const express = require("express");
const router = express.Router();

const { search, add, get } = require("../controllers/follow");

router.post("/search", search);

router.post("/add", add);

router.get("/get", get);

module.exports = router;
