const express = require("express");
const cors = require('cors');

const app = express();
const routes = require("./routes");


app.use(express.json());
app.use(cors());


app.use("/", routes);

app.use((error, req, res, next) => {
    console.log(error);
    return res.status(400).send({ msg: error.message });
});



module.exports.app = app;