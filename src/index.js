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
        <span class="other-cities-date">${moment().tz(fixedCitiesTimezone).format("dddd, MMMM D, YYYY")}</span>
        </div>
        <div class="other-cities-clock">${moment().tz(fixedCitiesTimezone).format("hh:mm:ss [<small>]A[</small>]")}</div>
        </div>
        `
    });
    otherCitiesElement.innerHTML = otherCitiesHtml;
}

function displayTime(selectTimezone){
    let mainClockElement = document.querySelector("#main-clock");
    mainClockElement.innerHTML = moment().tz(selectTimezone).format("hh:mm:ss [<small>]A[</small>]");
}

function displayDate(selectTimezone){
    let mainClockDateElement = document.querySelector("#main-clock-date");
    mainClockDateElement.innerHTML = moment().tz(selectTimezone).format("dddd, MMMM D, YYYY");
}

function selectCity(event){
    let city = "unknown";
    
    if (event.target.value.length > 0){
        if (event.target.value === "current-location"){
            city = "Current Location";
        }
        if (event.target.value === "los-angeles"){
            city = "Los Angeles";
        }
        if (event.target.value === "mexico-city"){
            city = "Mexico City";
        }
        if (event.target.value === "tokyo"){
            city = "Tokyo";
        }
        if (event.target.value === "sydney"){
            city= "Sydney";
        }
    }

    let mainCityName = document.querySelector("#main-city-name");
    mainCityName.innerHTML = city;
}

function setTimeDate(event){
    let timezone = "America/New_York";

    if (event.target.value.length > 0){
        if (event.target.value === "current-location"){
            timezone = moment.tz.guess();
        }
        if (event.target.value === "los-angeles"){
            timezone = "America/Los_Angeles";
        }
        if (event.target.value === "mexico-city"){
            timezone = "America/Mexico_City";
        }
        if (event.target.value === "tokyo"){
            timezone = "Asia/Tokyo";
        }
        if (event.target.value === "sydney"){
            timezone = "Australia/Sydney";
        }
    }

    displayTime(timezone);
    displayDate(timezone);
}

function readSelectedTimezone(){
    let citySelectElement = document.querySelector("#city-select");
    citySelectElement.addEventListener("change", setTimeDate);
}

function readSelectedCity(){
    let citySelectElement = document.querySelector("#city-select");
    citySelectElement.addEventListener("change", selectCity);
}

function displayDefaultCity(){
    let mainCityNameElement = document.querySelector("#main-city-name");
    mainCityNameElement.innerHTML = "Baltimore";
    displayTime ("America/New_York");
    displayDate ("America/New_York");
}

readSelectedCity();
setInterval(readSelectedCity, 1000);

readSelectedTimezone();
setInterval(readSelectedTimezone, 1000);

displayFixedCities();
setInterval(displayFixedCities, 1000);

/* --- displays Baltimore time, for whenever the error in the selected cities is fixed ---
displayDefaultCity()
setInterval(displayDefaultCity, 1000);
*/