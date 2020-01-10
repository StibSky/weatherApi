let button = document.getElementById("click");
let input = document.getElementById("cityInput");
let cityName = document.getElementById("cityname");
let description = document.getElementById("description");
let temp = document.getElementById("temperature");



button.addEventListener("click", function () {

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&appid=31a8f4d05ccba8c89d8dcd4ee4fbec1c')
        .then(link => link.json())
        .then(data =>  {
            console.log(data);
            let nameValue = data['city']['name'];
            cityName.innerHTML = nameValue;
            let temperatures =
        })

        .catch(error => alert("something went wrong"))

});