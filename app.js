var testAPIRouter = require("./routes/testAPI");


const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const { details } = require("./public");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function (req, res) {
  console.log(res);
  res.sendFile(__dirname + "/index.html");
})

app.listen(process.env.PORT || 3000, function () {
  console.log(`The Server is up and running on port: ${process.env.PORT || '3000'}`);
})
app.use("/testAPI", testAPIRouter);