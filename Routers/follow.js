const express = require("express");
const router = express.Router();

const { search, add, get } = require("../controller/follow");

router.post("/search", search);

router.post("/add", add);

router.get("/get", get);
