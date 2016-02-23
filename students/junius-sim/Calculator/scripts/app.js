function init () {
  console.log("website is loaded");

  // Basic Calculator

  var basicCalButton = document.getElementById("basic-calc");
  var basicDiv = document.getElementById("basic-answer-alert");

  function basicCalculate() {
    // var not only avoids repetition but increase the speed of the program
    var firstValue = parseFloat(document.getElementById("basic-num-1").value);
    var secondValue = parseFloat(document.getElementById("basic-num-2").value);
    var operator = document.getElementById("basic-operation").value;
    // console.log(firstValue);
    // console.log(secondValue);
    // console.log(operator);
    switch (operator) {
      case "+":
        var total = firstValue + secondValue;
        // return console.log(firstValue + secondValue);
        basicDiv.innerText = total;
        basicDiv.style.background = "orange";
        break;
      case "-":
        // return console.log(firstValue - secondValue);
        var total = firstValue - secondValue;
        basicDiv.innerText = total;
        basicDiv.style.background = "orange";
        break;
      case "*":
        // return console.log(firstValue * secondValue);
        var total = firstValue * secondValue;
        basicDiv.innerText = total;
        basicDiv.style.background = "orange";
        break;
      case "/":
        // return console.log(firstValue / secondValue);
        var total = (firstValue / secondValue).toFixed(2);
        basicDiv.innerText = total;
        basicDiv.style.background = "orange";
        break;
      default:
        return console.log("Have you used a calculator before?")
    };
  };

  basicCalButton.addEventListener("click", basicCalculate, false);

  // Trip Calculator
  var tripCalButton = document.getElementById("trip-calc");
  var tripDiv = document.getElementById("trip-answer-alert");

  function tripCalculate() {
    console.log("tripCalculate runs")
    var distance = parseFloat(document.getElementById("trip-distance").value);
    var consumptionRate = parseFloat(document.getElementById("trip-mpg").value);
    var cost = parseFloat(document.getElementById("trip-cost").value);
    var speed = parseFloat(document.getElementById("trip-speed").value);
    console.log (distance, consumptionRate, cost, speed);
    if (speed <= 60) {
      var total = ((distance/consumptionRate)*cost).toFixed(2);
      tripDiv.innerText = total;

    } else {
      var total = ( (distance/ ( consumptionRate-(( speed - 60 ) * 2 ) ) ) * cost ).toFixed(2);
      tripDiv.innerText = total;
      tripDiv.style.background = "orange";
    }
  };

  tripCalButton.addEventListener("click", tripCalculate, false);

  // BMI Calculator

  var BMICalButton = document.getElementById("bmi-calc");
  var BMIDiv = document.getElementById("bmi-answer-alert");

  function BMICalculate() {
    console.log("BMICalculate works")
    var mass = parseFloat(document.getElementById("bmi-mass").value);
    var height = parseFloat(document.getElementById("bmi-height").value);
    console.log(mass, height);
    var total = (((mass * 2.20462)/(Math.pow( (height * 39.9701), 2 )) )*703).toFixed(2);
    BMIDiv.innerText = total;
    BMIDiv.style.background = "orange";
  };

  BMICalButton.addEventListener("click", BMICalculate, false);

  // Mortgage Calculator

  var mortgageButton = document.getElementById("mortgage-calc");
  var mortgageDiv = document.getElementById("mortgage-answer-alert");

  function mortgageCalculate () {
    var loan = parseFloat(document.getElementById("mortgage-loan").value);
    var annualRate = parseFloat(document.getElementById("mortgage-apr").value);
    var terms = parseFloat(document.getElementById("mortgage-term").value);
    var monthlyRate = annualRate/12;
    var total = ( (loan * monthlyRate * Math.pow((1+monthlyRate), terms)) / (Math.pow((1+monthlyRate),terms)-1) ).toFixed(2);
    mortgageDiv.innerText = total;
    mortgageDiv.style.background = "orange";
  };
  mortgageButton.addEventListener("click", mortgageCalculate, false);

};

window.addEventListener("load", init, false);
