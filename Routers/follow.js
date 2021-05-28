const express = require("express");
const router = express.Router();

const { search, add, get, remove } = require("../controllers/follow");

router.post("/search", search);

router.post("/add", add);

router.get("/get", get);

router.post("/remove", remove);

module.exports = router;
