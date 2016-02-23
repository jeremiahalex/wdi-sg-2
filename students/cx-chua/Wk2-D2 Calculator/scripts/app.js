// adding listeners

function ready() {
	console.log("Getting ready");

	document.getElementById("basic-calc").addEventListener('click',function(event) {
		basicCalc(document.getElementById("basic-num-1").value,
				document.getElementById("basic-operation").value,
				document.getElementById("basic-num-2").value)},false);

	console.log("Basic calc listeners added");

	document.getElementById("trip-calc").addEventListener('click',function(event) {
		tripCalc(document.getElementById("trip-distance").value,
				document.getElementById("trip-mpg").value,
				document.getElementById("trip-cost").value,
				document.getElementById("trip-speed").value)},false);

	console.log("Trip calc listeners added");

	document.getElementById("bmi-calc").addEventListener('click',function(event) {
		bmiCalc(document.getElementById("bmi-mass").value,
				document.getElementById("bmi-height").value)},false);

	console.log("BMI calc listeners added");

	document.getElementById("mortgage-calc").addEventListener('click',function(event) {
		mortCalc(document.getElementById("mortgage-loan").value,
				document.getElementById("mortgage-apr").value,
				document.getElementById("mortgage-term").value)},false);

	console.log("Mortgage calc listeners added");

	console.log("All listeners added");

	document.getElementById("basic-answer-alert").innerHTML = "";
	document.getElementById("trip-answer-alert").innerHTML = "";
	document.getElementById("bmi-answer-alert").innerHTML = "";
	document.getElementById("mortgage-answer-alert").innerHTML = "";

	console.log("Answer boxes cleared");

	document.getElementById("basic-answer-alert").style.backgroundColor = "transparent";
	document.getElementById("trip-answer-alert").style.backgroundColor = "transparent";
	document.getElementById("bmi-answer-alert").style.backgroundColor = "transparent";
	document.getElementById("mortgage-answer-alert").style.backgroundColor = "transparent";	
	document.getElementById("basic-answer-alert").style.border = "transparent";
	document.getElementById("trip-answer-alert").style.border = "transparent";
	document.getElementById("bmi-answer-alert").style.border = "transparent";
	document.getElementById("mortgage-answer-alert").style.border = "transparent";		
	console.log("Answer boxes hidden");
}

// basic calculation
function basicCalc(num1,operator,num2) {
	console.log("Basic calculator clicked!");
	ready();

	if ((num1==="")||(num2==="")) {
		return alert("Please check that calculator numbers are filled in");
	}

	if (operator==="+") {
		document.getElementById("basic-answer-alert").innerHTML = parseFloat(num1) + parseFloat(num2);
	}

	if (operator==="-") {
		document.getElementById("basic-answer-alert").innerHTML = parseFloat(num1) - parseFloat(num2);
	}

	if (operator==="*") {
		document.getElementById("basic-answer-alert").innerHTML = parseFloat(num1) * parseFloat(num2);
	}

	if (operator==="/") {
		if (num2==0) {return alert ("Cannot divide  by zero! Please don't cause the universe to collapse");}
		else {document.getElementById("basic-answer-alert").innerHTML = (parseFloat(num1) / parseFloat(num2)).toFixed(3);}
	}
	document.getElementById("basic-answer-alert").style.backgroundColor = "moccasin";
}

// trip calculation
function tripCalc(dist,mpg,costPerG,speed) {
	console.log("Trip calculator clicked!");
	ready();

	if ((dist==="")||(mpg==="")||(costPerG==="")||(speed==="")) {
		return alert("Please check that trip numbers are filled in");
	}

	if (speed < 60) {
		document.getElementById("trip-answer-alert").innerHTML = ("$ " + (dist / mpg * costPerG));}

	if (speed >= 60) {
		document.getElementById("trip-answer-alert").innerHTML = ("$ " + (dist / (mpg - (speed - 60) * 2) * costPerG));}

	document.getElementById("trip-answer-alert").style.backgroundColor = "moccasin"
}

// BMI calculation
function bmiCalc(massKg,heightM) {
	console.log("BMI calculator clicked!");
	ready();

	if((massKg==="")||(heightM==="")) {
		return alert("Please check that BMI numbers are filled in");
	}

	else {document.getElementById("bmi-answer-alert").innerHTML = ("BMI: " + (massKg * 2.20462 / ((heightM * 39.3701) * (heightM * 39.3701)) * 703).toFixed(3));}
	
	document.getElementById("bmi-answer-alert").style.backgroundColor = "moccasin"
}

// Mortgage calculation

function mortCalc(loan,APR,term) {
	console.log("Mortgage calculator clicked!");
	ready();

	if ((loan==="")||(APR==="")||(term==="")) {
		return alert("Please check that mortgage numbers are filled in");
	}

	else { document.getElementById("mortgage-answer-alert").innerHTML = 
			"Monthly Payment (&pound): " + (loan * (Math.pow(1+APR/100,1/12)-1) * Math.pow((1+(Math.pow(1+APR/100,1/12)-1)),term) / (Math.pow((1+(Math.pow(1+APR/100,1/12)-1)),term)-1)).toFixed(2);
			}

	document.getElementById("mortgage-answer-alert").style.backgroundColor = "moccasin"		
}

// load when ready
window.addEventListener('load', ready, false);

