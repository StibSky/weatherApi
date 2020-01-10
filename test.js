let button = document.getElementById("click");
let input = document.getElementById("cityInput");
let cityName = document.getElementById("cityname");
let description = document.getElementById("description");
let tempday1 = document.getElementById("temperature1");



button.addEventListener("click", function () {

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&appid=31a8f4d05ccba8c89d8dcd4ee4fbec1c')
        .then(link => link.json())
        .then(data =>  {
            let nameValue = data['city']['name'];
            cityName.innerHTML = nameValue;
            let temperatures = data['list'];
            let slicer = (start, end)=> {
                return temperatures.slice(start,end)
            };
            let dayOne = slicer(0,8);
            let dayTwo = slicer(0,8);
            let dayThree = slicer(0,8);
            let dayFour = slicer(0,8);
            let dayFive = slicer(0,8);
            let dayOneTemps = [];
            for (let i = 0; i < 8 ; i++) {
                dayOneTemps.push(dayOne[i]['main']['temp']);
            }

            console.log(dayOneTemps);
            let averageTemp = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
            let tempOne = (averageTemp(dayOneTemps)-273.15).toFixed(2);
            averageTemp(dayOneTemps);
            console.log(averageTemp(dayOneTemps));

            tempday1.innerHTML = "temperature first day: " +tempOne + " °Celcius";

        })

        //.catch(error => alert("something went wrong"))

});