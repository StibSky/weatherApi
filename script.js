let button = document.getElementById("click");
let input = document.getElementById("cityInput");
let cityName = document.getElementById("cityname");
let description = document.getElementById("description");
let temp = document.getElementById("temperature");



button.addEventListener("click", function () {

   // https://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&appid=31a8f4d05ccba8c89d8dcd4ee4fbec1c
// the ++ allows you to input something inside the string
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=31a8f4d05ccba8c89d8dcd4ee4fbec1c')
.then(link => link.json())
.then(data =>  {
    console.log(data);
let nameValue = data['name'];
let kelvValue = data['main']['temp'];
let descValue = data['weather'][0]['description'];
let celciusValue = kelvValue-273.15;
let roundTwoDigits = celciusValue.toFixed(2);

cityName.innerHTML = nameValue;
temp.innerHTML= roundTwoDigits + '° Celcius';
description.innerHTML = descValue;

    })

.catch(error => alert("something went wrong"))

});