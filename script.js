let button = document.getElementById("click");
let input = document.getElementById("cityInput");
let cityName = document.getElementById("cityname");
let description = document.getElementById("description");
let tempday1 = document.getElementById("temperature1");
let tempday2 = document.getElementById("temperature2");
let tempday3 = document.getElementById("temperature3");
let tempday4 = document.getElementById("temperature4");
let tempday5 = document.getElementById("temperature5");
let descday1 = document.getElementById("description1");
let descday2 = document.getElementById("description2");
let descday3 = document.getElementById("description3");
let descday4 = document.getElementById("description4");
let descday5 = document.getElementById("description5");
let imageOne = document.getElementById("imageOne");
let imageTwo = document.getElementById("imageTwo");
let imageThree = document.getElementById("imageThree");
let imageFour = document.getElementById("imageFour");
let imageFive = document.getElementById("imageFive");







button.addEventListener("click", function () {

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&appid=31a8f4d05ccba8c89d8dcd4ee4fbec1c')
        .then(link => link.json())
        .then(data =>  {
            let nameValue = data['city']['name'];
            cityName.innerHTML = nameValue;
            let infoPerDay = data['list'];
            let slicer = (start, end)=> {
                return infoPerDay.slice(start,end)
            };
            //slice each day
            let dayOne = slicer(0,8);
            let dayTwo = slicer(8,16);
            let dayThree = slicer(16,24);
            let dayFour = slicer(24,32);
            let dayFive = slicer(32,40);

            //make empty arrays to push temperatures per day
            let dayOneTemps = [];
            let dayTwoTemps = [];
            let dayThreeTemps = [];
            let dayFourTemps = [];
            let dayFiveTemps = [];

            //push temperatures per day
            for (let i = 0; i < 8 ; i++) {
                dayOneTemps.push(dayOne[i]['main']['temp']);
                dayTwoTemps.push(dayTwo[i]['main']['temp']);
                dayThreeTemps.push(dayThree[i]['main']['temp']);
                dayFourTemps.push(dayFour[i]['main']['temp']);
                dayFiveTemps.push(dayFive[i]['main']['temp']);
            }
            //make empty arrays to push description
            let dayOneDescription = [];
            let dayTwoDescription = [];
            let dayThreeDescription = [];
            let dayFourDescription = [];
            let dayFiveDescription = [];

            for (let i = 0; i < 8 ; i++) {
                dayOneDescription.push(dayOne[i]['weather'][0]['description']);
                dayTwoDescription.push(dayTwo[i]['weather'][0]['description']);
                dayThreeDescription.push(dayThree[i]['weather'][0]['description']);
                dayFourDescription.push(dayFour[i]['weather'][0]['description']);
                dayFiveDescription.push(dayFive[i]['weather'][0]['description']);
            }

            let dayOneIcon =[];
            let dayTwoIcon =[];
            let dayThreeIcon =[];
            let dayFourIcon =[];
            let dayFiveIcon =[];


            for (let i = 0; i < 8 ; i++) {
                dayOneIcon.push(dayOne[i]['weather'][0]['icon']);
                dayTwoIcon.push(dayTwo[i]['weather'][0]['icon']);
                dayThreeIcon.push(dayThree[i]['weather'][0]['icon']);
                dayFourIcon.push(dayFour[i]['weather'][0]['icon']);
                dayFiveIcon.push(dayFive[i]['weather'][0]['icon']);
            }


// get the average temperature for each day
            let averageTemp = arr => Math.floor(((arr.reduce((a,b) => a + b, 0) / arr.length)-273.15));
            let tempOne = averageTemp(dayOneTemps);
            let tempTwo = averageTemp(dayTwoTemps);
            let tempThree = averageTemp(dayThreeTemps);
            let tempFour = averageTemp(dayFourTemps);
            let tempFive = averageTemp(dayFiveTemps);


            // fill in temperatures
            tempday1.innerHTML = tempOne + "° Celcius";
            tempday2.innerHTML = tempTwo + "° Celcius";
            tempday3.innerHTML = tempThree + "° Celcius";
            tempday4.innerHTML = tempFour + "° Celcius";
            tempday5.innerHTML = tempFive + "° Celcius";
            console.log(data['list']);

            // fill in descriptions
            console.log(dayThreeDescription);
            descday1.innerHTML =  dayOneDescription[4];
            descday2.innerHTML =  dayTwoDescription[4];
            descday3.innerHTML =  dayThreeDescription[4];
            descday4.innerHTML =  dayFourDescription[4];
            descday5.innerHTML =  dayFiveDescription[4];


            //Set images
            imageOne.setAttribute('src', "http://openweathermap.org/img/wn/"+dayOneIcon[4]+".png");
            imageTwo.setAttribute('src', "http://openweathermap.org/img/wn/"+dayTwoIcon[4]+".png");
            imageThree.setAttribute('src', "http://openweathermap.org/img/wn/"+dayThreeIcon[4]+".png");
            imageFour.setAttribute('src', "http://openweathermap.org/img/wn/"+dayFourIcon[4]+".png");
            imageFive.setAttribute('src', "http://openweathermap.org/img/wn/"+dayFiveIcon[4]+".png");




        })

        .catch(error => alert("not a city name"))

});