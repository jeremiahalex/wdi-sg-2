function init()
{
	console.log("JS Loaded!");

	calculator();
	tripCalc();
	bmiCalc();
	mortgageCalc();
	switchMode();

	var calText = document.getElementById("basic-answer-alert");
	var tripText = document.getElementById("trip-answer-alert");
	var bmiText = document.getElementById("bmi-answer-alert");
	var mortgageText = document.getElementById("mortgage-answer-alert");

	calText.style.display = "none";
	tripText.style.display = "none";
	bmiText.style.display = "none";
	mortgageText.style.display = 'none';

	function calculator()
	{
		var calcButton = document.getElementById("basic-calc");
		calcButton.addEventListener("click",calculate);
		

		function calculate()
		{
			var no1 =  parseInt(document.getElementById("basic-num-1").value);
			var no2 = parseInt(document.getElementById("basic-num-2").value);
			var operator = document.getElementById("basic-operation").value;
			var answer = document.getElementById("basic-answer-alert");

			calText.style.display = "block";
			tripText.style.display = "none";
			bmiText.style.display = "none";
			mortgageText.style.display = "none";
			
			switch(operator)
			{
				case "+":
					answer.innerText = add(no1,no2)
					break;
				case "-":
					answer.innerText = minus(no1,no2)
					break;
				case "*":
					answer.innerText = times(no1,no2)
					break;
				case "/":
					answer.innerText = divide(no1,no2)
					break;
				default:
			}

			function add(a,b)
			{
				return a+b;
			}

			function minus(a,b)
			{
				return a-b;
			}

			function times(a,b)
			{
				return a * b;
			}

			function divide(a,b)
			{
				return a / b;
			}

		}
	}

	function tripCalc()
	{
		var calcButton = document.getElementById("trip-calc");
		calcButton.addEventListener("click",calculate);

		function calculate()
		{
			var tripDist =  parseInt(document.getElementById("trip-distance").value);
			var mpg =  parseInt(document.getElementById("trip-mpg").value);
			var cost = parseInt(document.getElementById("trip-cost").value);
			var speed = parseInt(document.getElementById("trip-speed").value);
			var answer = document.getElementById("trip-answer-alert");

			calText.style.display = "none";
			tripText.style.display = "block";
			bmiText.style.display = "none";
			mortgageText.style.display = "none";

			if(speed < 60)
			{
				answer.innerText = tripDist / mpg * cost;
			}
			else
			{
				answer.innerText = tripDist / (mpg - (speed-60) * 2) * cost;
			}
		}
	}

	function switchMode()
	{
		var dropDown = document.getElementById("bmi-units");
		var massUnit = document.getElementById("bmi-mass-unit");
		var heightUnit = document.getElementById("bmi-height-unit");
		dropDown.addEventListener("input",change);

		function change()
		{
			var massForm = document.getElementById("bmi-mass");
			var heightForm = document.getElementById("bmi-height");

			var mass = parseFloat(document.getElementById("bmi-mass").value);
			var height =parseFloat(document.getElementById("bmi-height").value);

			var units = document.getElementById("bmi-units").value;	
			if(units == "metric")
			{
				massUnit.innerText = "kg";
				heightUnit.innerText = "m";

				var newMass = mass/2.20462;
				var newHeight = height/39.3701;

				massForm.value = newMass;
				heightForm.value = newHeight;

			}
			else if(units == "imperial")
			{
				massUnit.innerText = "pounds";
				heightUnit.innerText = "inches";

				var newMass = mass*2.20462;
				var newHeight = height*39.3701;

				massForm.value = newMass;
				heightForm.value = newHeight;
			}
		}
		
	}

	function bmiCalc()
	{
		var calcButton = document.getElementById("bmi-calc");
		calcButton.addEventListener("click",calculate);

		function calculate()
		{
			var mass =  parseFloat(document.getElementById("bmi-mass").value);
			var height =  parseFloat(document.getElementById("bmi-height").value);
			var dropDown = document.getElementById("bmi-units").value;
			var answer = document.getElementById("bmi-answer-alert");

			calText.style.display = "none";
			tripText.style.display = "none";
			bmiText.style.display = "block";
			mortgageText.style.display = "none";

			if(dropDown == "imperial")
			{
				answer.innerText = ((mass / (height * height)) * 703).toFixed(1);
			}
			else
			{
				answer.innerText = (mass / (height * height)).toFixed(1);
			}
			
		}
	}

	function mortgageCalc()
	{
		var calcButton = document.getElementById("mortgage-calc");
		calcButton.addEventListener("click",calculate);

		function calculate()
		{
			var loan =  parseFloat(document.getElementById("mortgage-loan").value);
			var apr =  parseFloat(document.getElementById("mortgage-apr").value);
			var term = parseFloat(document.getElementById("mortgage-term").value);
			var answer = document.getElementById("mortgage-answer-alert");

			calText.style.display = "none";
			tripText.style.display = "none";
			bmiText.style.display = "none";
			mortgageText.style.display = "block";

			answer.innerText = (loan * (apr/100) * (Math.pow(1+(apr/100)),term) / (Math.pow((1+(apr/100)),term) - 1)).toFixed(2);
		}
	}
}
window.addEventListener("load",init,false);


