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




// get the average temperature for each day
            let averageTemp = arr => Math.floor(((arr.reduce((a,b) => a + b, 0) / arr.length)-273.15));
            let tempOne = averageTemp(dayOneTemps);
            let tempTwo = averageTemp(dayTwoTemps);
            let tempThree = averageTemp(dayThreeTemps);
            let tempFour = averageTemp(dayFourTemps);
            let tempFive = averageTemp(dayFiveTemps);

            //most frequent element in description arrays
            //used this source for the most frequent function, has very good understandable  structure
            //https://medium.com/@AmJustSam/how-to-find-most-frequent-item-of-an-array-12015df68c65

            function frequency(array){
                let counts = {};
                let compare = 0;
                let mostFrequent;
                for(let i = 0, len = array.length; i < len; i++){
                    let word = array[i];

                    if(counts[word] === undefined){
                        counts[word] = 1;
                    }else{
                        counts[word] = counts[word] + 1;
                    }
                    if(counts[word] > compare){
                        compare = counts[word];
                        mostFrequent = array[i];
                    }
                }
                return mostFrequent;
            }
            // fill in temperatures
            tempday1.innerHTML = tempOne + "° Celcius";
            tempday2.innerHTML = tempTwo + "° Celcius";
            tempday3.innerHTML = tempThree + "° Celcius";
            tempday4.innerHTML = tempFour + "° Celcius";
            tempday5.innerHTML = tempFive + "° Celcius";
            console.log(data['list']);

            // fill in descriptions
            descday1.innerHTML =  frequency(dayOneDescription);
            descday2.innerHTML =  frequency(dayTwoDescription);
            descday3.innerHTML =  frequency(dayThreeDescription);
            descday4.innerHTML =  frequency(dayFourDescription);
            descday5.innerHTML =  frequency(dayFiveDescription);




        })

        .catch(error => alert("not a city name"))

});