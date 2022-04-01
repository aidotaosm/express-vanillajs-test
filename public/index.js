//jshint esversion: 6

//Global Variables for revenue-form
var rf_x1, rf_x2, rf_x3, rf_t1;
var rf_sem1, rf_sem2, rf_sem3, rf_year1, rf_year2, rf_year3;

//Counter Variables
var i = 0;
var j = 0;

// Display Form Input Data on Button Click for Selection List
function findVal(name, id) {
  var element = document.getElementById(name + id);
  if (element) {
    return element.value;
  }
  return ' ';
}

//Get Class Size
function classSize(name, id, label) {
  var element = document.getElementById(name + id);
  var content = document.getElementById(name + label);
  if (element) {
    if (element.checked) {
      if (content) {
        return "(" + document.getElementById(name + label).textContent + ")";
      } else {
        return ' ';
      }
    } else {
      return ' ';
    }
  }
  return null;
}

function assignValueRF() {
  //Get values for chart x-axis label for revenue-form
  if (document.getElementById("rf-school")) {
    if (j == 0) {
      rf_x1 = semester + ' ' + year;
      rf_t1 = school;
      rf_year1 = year;
      rf_sem1 = semester;
      document.getElementById("rf-school").setAttribute("disabled", "");
      j++;
    } else if (j == 1) {
      rf_x2 = semester + ' ' + year;
      rf_year2 = year;
      rf_sem2 = semester;
      j++;
    } else if (j == 2) {
      rf_x3 = semester + ' ' + year;
      rf_year3 = year;
      rf_sem3 = semester;
      j = 0;
    }
  }
}

//Fill up selection list and get data for chart
function selectionList(name) {
  school = findVal(name, "-school");
  semester = findVal(name, "-semester");
  year = findVal(name, "-year");
  studentno = findVal(name, "-student");

  detail = document.getElementById(name + "-detail");
  if (detail) {
    detail = detail.checked;
  }

  c1 = classSize(name, "-c1", "-l1");
  c2 = classSize(name, "-c2", "-l2");
  c3 = classSize(name, "-c3", "-l3");
  c4 = classSize(name, "-c4", "-l4");
  c5 = classSize(name, "-c5", "-l5");
  c6 = classSize(name, "-c6", "-l6");
  c7 = classSize(name, "-c7", "-l7");
  c8 = classSize(name, "-c8", "-l8");
  c9 = classSize(name, "-c9", "-l9");

  if (detail == true) {
    detail = '(Detailed)'
  } else if (detail == false) {
    detail = ' ';
  }

  //Output Result based on conditions
  if (studentno != ' ') {
    result = semester + ' ' + year + ' Students < ' + studentno + ' ' + detail;
    console.log('Condition 1 executed.');
  } else if (c1 != null) {
    result = semester + ' ' + year + ' ' + c1 + ' ' + c2 + ' ' + c3 + ' ' + c4 + ' ' +
      c5 + ' ' + c6 + ' ' + c7 + ' ' + c8 + ' ' + c9;
    console.log('Condition 2 executed.');
  } else {
    result = school + ' ' + semester + ' ' + year;
    console.log('Condition 3 executed.');
  }

  //Assign values to revenue-form global variables
  assignValueRF();

  //Get text for slection list items
  if (i == 0) {
    document.getElementById(name + "_li1").textContent = result;
  } else if (i == 1) {
    document.getElementById(name + "_li2").textContent = result;
  } else {
    document.getElementById(name + "_li3").textContent = result;
  }
  if (i <= 2) {
    i++;
  }
}

//Reinitialize variables and clear selection list
function clearList(name) {
  document.getElementById(name + "_li1").textContent = "";
  document.getElementById(name + "_li2").textContent = "";
  document.getElementById(name + "_li3").textContent = "";
  i = 0;
  j = 0;
  document.getElementById("rf-school").removeAttribute("disabled");
  rf_x1 = "";
  rf_x2 = "";
  rf_x3 = "";
}

//Import Export from database

var details = {
  school: "SETS",
  semester1: rf_sem1,
  semester2: rf_sem2,
  semester3: rf_sem3,
  year: rf_year1,
  year: rf_year2,
  year: rf_year3,
  totalCredits1: 0,
  totalCredits2: 0,
  totalCredits3: 0,
}
// const lala = () => {
//   fetch('http://localhost:3000/')
//     .then(response => response.json())
//     .then(data => console.log(data));
// }
// lala();
module.exports = {
  details
};

// const myPromise = new Promise(function (resolve, reject) {
//   doSomeAsyncWork(function (result) {
//     // Some kind of async call with a callback function or somesuch...
//     resolve(result);
//   });
// }).then(data => {
//   // Do something with the final result
//   console.log(data);
// });
