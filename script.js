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
    setBgImage();


    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input.value + '&appid=31a8f4d05ccba8c89d8dcd4ee4fbec1c')
        .then(link => link.json())
        .then(data => {
            // Getting the length of the remaining day ((matthijs helped a great deal))
            let toSlice;
            let sliced = [];
            let dateArray = [];
            let lengthOfFirstDay = [];
            for (l=0; l < data.list.length; l++) {
                toSlice = data.list[l].dt_txt;
                //console.log(toSlice);
                sliced.push(toSlice.slice(0, 10));
                dateArray.push(new Date(sliced[l]).getDay());
                if (dateArray[0] == dateArray[l]){
                    lengthOfFirstDay.push(dateArray[l]);
                }
            }
            let tempOfAllDays = [];

           for (let i = 0; i < data.list.length; i++) {
               tempOfAllDays.push(data.list[i].main.temp);
           }
           console.log(sliced +" sliced");
            console.log(dateArray + " dateArray");
           console.log(lengthOfFirstDay + "lengthoffirstday");
            console.log(lengthOfFirstDay.length);



            let toDay = new Date();
            let weekdays = new Array(7);
            weekdays[0] = "Sunday";
            weekdays[1] = "Monday";
            weekdays[2] = "Tuesday";
            weekdays[3] = "Wednesday";
            weekdays[4] = "Thursday";
            weekdays[5] = "Friday";
            weekdays[6] = "Saturday";
            weekdays[7] = "Sunday";
            weekdays[8] = "Monday";
            weekdays[9] = "Tuesday";
            weekdays[10] = "Wednesday";
            weekdays[11] = "Thursday";
            weekdays[12] = "Friday";
            weekdays[13] = "Saturday";
            console.log(weekdays[toDay.getDay()]);
            console.log(toDay.getDay());

            document.getElementById("dayTwo").innerHTML = weekdays[((toDay).getDay()+1)];
            document.getElementById("dayThree").innerHTML = weekdays[((toDay).getDay()+2)];
            document.getElementById("dayFour").innerHTML = weekdays[((toDay).getDay()+3)];
            document.getElementById("dayFive").innerHTML = weekdays[((toDay).getDay()+4)];


            let nameValue = data['city']['name'];
            cityName.innerHTML = nameValue;
            let infoPerDay = data['list'];
            let slicer = (start, end) => {
                return infoPerDay.slice(start, end)
            };

            //slice each day
            //it is WAY smarter to only slice after the for loop, first get an array of all the data
            //for now I'll stick to my own ways
            let dayOne = slicer(0, 8);
            let dayTwo = slicer(8, 16);
            let dayThree = slicer(16, 24);
            let dayFour = slicer(24, 32);
            let dayFive = slicer(32, 40);




            var dayOneTemps = tempOfAllDays.slice(0, lengthOfFirstDay.length);
            var dayTwoTemps = tempOfAllDays.slice(lengthOfFirstDay.length, lengthOfFirstDay.length+8);
            var dayThreeTemps = tempOfAllDays.slice(lengthOfFirstDay.length+8, lengthOfFirstDay.length+16);
            var dayFourTemps = tempOfAllDays.slice(lengthOfFirstDay.length+16, lengthOfFirstDay.length+24);
            var dayFiveTemps = tempOfAllDays.slice(lengthOfFirstDay.length+24, lengthOfFirstDay.length+32);

            console.log(tempOfAllDays +"temp all");
        console.log(dayOneTemps + "dayonetemps");
            //make empty arrays to push description
            let dayOneDescription = [];
            let dayTwoDescription = [];
            let dayThreeDescription = [];
            let dayFourDescription = [];
            let dayFiveDescription = [];

            for (let i = 0; i < 8; i++) {
                dayOneDescription.push(dayOne[i]['weather'][0]['description']);
                dayTwoDescription.push(dayTwo[i]['weather'][0]['description']);
                dayThreeDescription.push(dayThree[i]['weather'][0]['description']);
                dayFourDescription.push(dayFour[i]['weather'][0]['description']);
                dayFiveDescription.push(dayFive[i]['weather'][0]['description']);
            }

            let dayOneIcon = [];
            let dayTwoIcon = [];
            let dayThreeIcon = [];
            let dayFourIcon = [];
            let dayFiveIcon = [];


            for (let i = 0; i < 8; i++) {
                dayOneIcon.push(dayOne[i]['weather'][0]['icon']);
                dayTwoIcon.push(dayTwo[i]['weather'][0]['icon']);
                dayThreeIcon.push(dayThree[i]['weather'][0]['icon']);
                dayFourIcon.push(dayFour[i]['weather'][0]['icon']);
                dayFiveIcon.push(dayFive[i]['weather'][0]['icon']);
            }


// get the average temperature for each day
            let averageTemp = arr => Math.floor(((arr.reduce((a, b) => a + b, 0) / arr.length) - 273.15));
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
            descday1.innerHTML = dayOneDescription[4];
            descday2.innerHTML = dayTwoDescription[4];
            descday3.innerHTML = dayThreeDescription[4];
            descday4.innerHTML = dayFourDescription[4];
            descday5.innerHTML = dayFiveDescription[4];


            //Set images
            imageOne.setAttribute('src', "http://openweathermap.org/img/wn/" + dayOneIcon[4] + ".png");
            imageTwo.setAttribute('src', "http://openweathermap.org/img/wn/" + dayTwoIcon[4] + ".png");
            imageThree.setAttribute('src', "http://openweathermap.org/img/wn/" + dayThreeIcon[4] + ".png");
            imageFour.setAttribute('src', "http://openweathermap.org/img/wn/" + dayFourIcon[4] + ".png");
            imageFive.setAttribute('src', "http://openweathermap.org/img/wn/" + dayFiveIcon[4] + ".png");


        })

        .catch(error => alert("not a city name"))


});

async function setBgImage() {
    let response = await fetch('https://api.unsplash.com/search/photos?query=$' + input.value + '&client_id=8b3303518e733b03bb9fbe890041915da381de31ef0602ad71dc8adfd4b79f83');
    let data = await response.json();
    let countryImage = data['results'][4]['urls']['regular'];
    //console.log(data);
    //console.log(countryImage);
    document.body.style.backgroundImage = `url(${countryImage})`;
    //console.log(document.body.style.backgroundImage)
}