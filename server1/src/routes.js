const express = require("express");
const router = express.Router();
const moment = require('moment');
const Chart = require('chart.js'); // Import Chart.js

const {getAll} = require("./controllers");
const {addUser} = require("./controllers")
const {deleteUser} = require("./controllers")
const {editUser} = require("./controllers")
const {graph} = require("./controllers")

router.get("/", getAll);
router.post("/", addUser);
router.delete("/:id",deleteUser);
router.patch("/:id", editUser);

router.get('/graph', graph);


module.exports = router;