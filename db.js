const express = require("express");
const mysql = require("mysql");
var charts = require('./public/charts');
var appjs = require('./app');
const { details } = require('./public/index');


const app = express();
app.use(express.json());
var router = express.Router();

//Create database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'iub_analytics'
})

//Connect to mysql
db.connect((err) => {
  if (err) {
    console.log("MySQL not connected")
    throw err;
  }
  console.log('MySQL Connected');
});

//Create database
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE iub_analytics'
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send('Database Created');
  })
})

//Convert to database heading format
function dbConvert(sem, year) {
  sem = (sem.substr(0, 3)).toLowerCase();
  year = year.substr(-2);
  var result = sem + year;
  return result;
}

//Function and query to get total credits
function getTotalCredits(sem, year) {
  var semester = dbConvert(sem, year);
  var schoolName = details.school;
  //console.log(schoolName);
  db.query("select sum(CREDIT_HOUR) as C_HOUR from " + semester + "_course where SCHOOL_TITLE = '" + schoolName + "'", function (err, rows) {
    if (err) {
      throw err;
    } else {
      var result = rows[0].C_HOUR;
      console.log(result);
      return result;
    }
  })
}

var last = getTotalCredits("Spring", "2021");
console.log("Returned value is " + last);

