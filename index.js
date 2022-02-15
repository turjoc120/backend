const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use("/static", express.static('./imageCollection'))
// middlewares 
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


app.use(cors());
const connectDatabase = require('./config/database')



// connecting to database 
connectDatabase()


// route imports 
const product = require("./routes/productRoutes");
app.use("/admin", product)


app.get("/", (req, res) => {
    res.send("hello you are at 1st week server")
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});