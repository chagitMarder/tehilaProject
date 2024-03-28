const {app} = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const PORT = 3000;
const mongoURL = "mongodb://0.0.0.0:27017/hadasim"

dotenv.config();

mongoose.connect(mongoURL)
    .then((con) => {
        console.log(`connected to database: ${mongoURL}`);
    }).catch((error) => {
        console.error("Error to connect to database");
        console.error(error);
    });






app.listen(PORT, () => {
    console.log("app is listening");    
})


app.get('/a', (req, res) => {
    res.send('Hello World!');
  });

