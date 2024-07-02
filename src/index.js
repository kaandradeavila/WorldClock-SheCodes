function displayFixedCities(){
    let fixedCities =["Madrid", "Miami", "Quito"];
    let otherCitiesElement = document.querySelector("#other-cities");
    let otherCitiesHtml = "";
    
    fixedCities.forEach(function(city) {
        let fixedCitiesTimezone = "unknown";
        if (city === "Madrid"){
            fixedCitiesTimezone = "Europe/Madrid";
        }
        if (city === "Miami"){
            fixedCitiesTimezone = "America/New_York";
        }

        if (city === "Quito"){
            fixedCitiesTimezone = "America/Guayaquil";
        }

        otherCitiesHtml += `
        <div class="fixed-cities row">
        <div class="fixed-cities-details">
        <span class="other-cities-name">${city}</span>
        <span class="other-cities-date">${moment().tz(fixedCitiesTimezone).format("dddd MMMM Do, YYYY")}</span>
        </div>
        <div class="other-cities-clock">${moment().tz(fixedCitiesTimezone).format("hh:mm:ss:S [<small>]A[</small>]")}</div>
        </div>
        `
    });
    otherCitiesElement.innerHTML = otherCitiesHtml;
}

function displayMainClockCity(city){
    let mainCityName = document.querySelector("#main-city-name");
    mainCityName.innerHTML = city;
}

function handleDate(timezone){
    let mainClockDateElement = document.querySelector("#main-clock-date");
    mainClockDateElement.innerHTML = moment().tz(timezone).format("dddd MMMM Do, YYYY");
}

function handleTime(timezone){
    let mainClockElement = document.querySelector("#main-clock");
    mainClockElement.innerHTML = moment().tz(timezone).format("h:mm:ss:S [<small>]A[</small>]");
}

function handleChangeCity(event){
    stopDefaultDisplay();
    let city = "Choose a City";
    
    if (event.target.value.length > 0){
        if (event.target.value === "current-location"){
            timezone = moment.tz.guess();
            city = timezone.replace("_", " ").split("/")[1];
        }
        if (event.target.value === "los-angeles"){
            city = "Los Angeles";
            timezone = "America/Los_Angeles";
        }
        if (event.target.value === "mexico-city"){
            city = "Mexico City";
            timezone = "America/Mexico_City";
        }
        if (event.target.value === "tokyo"){
            city = "Tokyo";
            timezone = "Asia/Tokyo";
        }
        if (event.target.value === "sydney"){
            city= "Sydney";
            timezone = "Australia/Sydney";
        }
    }
    else{
        city = "Baltimore";
        timezone = "America/New_York";
    }

    displayMainClockCity(city);
    handleTime(timezone);
    handleDate(timezone);
    setInterval(()=>{handleTime(timezone); handleDate(timezone)}, 100)
}

function displayDefaultCity(){
    let mainCityNameElement = document.querySelector("#main-city-name");
    mainCityNameElement.innerHTML = "Baltimore";
    handleTime("America/New_York");
    handleDate("America/New_York");
}

function stopDefaultDisplay(){
    clearInterval(displayDefault);
}

displayDefaultCity();
var displayDefault = setInterval(displayDefaultCity, 100);

displayFixedCities();
setInterval(displayFixedCities, 100);

let citySelectElement = document.querySelector("#city-select");
citySelectElement.addEventListener("change", handleChangeCity);