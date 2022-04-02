var express = require("express");
var router = express.Router();
const mysql = require("mysql");

const { details } = require('../public/index');
function dbConvert(sem, year) {
    sem = (sem.substr(0, 3)).toLowerCase();
    year = year.substr(-2);
    var result = sem + year;
    return result;
}
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

//Function and query to get total credits
function getTotalCredits(sem, year, callback) {
    var semester = dbConvert(sem, year);
    var schoolName = details.school;
    //console.log(schoolName);
    db.query("select sum(CREDIT_HOUR) as C_HOUR from " + semester + "_course where SCHOOL_TITLE = '" + schoolName + "'", function (err, rows) {
        if (err) {
            throw err;
        } else {
            var result = rows[0].C_HOUR;
            console.log(result);
            return callback(result);
        }
    })
}
router.get("/", function (req, res, next) {
    console.log(req.query);
    let sem = req.query.sem;
    let year = req.query.year;
    console.log(sem);
    console.log(year);
    getTotalCredits(sem, year, (param) => {
        res.send({ asd: param });
    });

});
module.exports = router;