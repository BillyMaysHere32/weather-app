export function initializeWebsite() {
    const content = document.getElementById('content');
    content.replaceChildren();

    // content.appendChild(createTitle("Weather"));


    
    const searchBtn = document.querySelector('.submit-button');
    const resetBtn = document.querySelector('.reset-button');


    searchBtn.addEventListener("click", getWeather);
    // resetBtn.addEventListener("click", function clearSearch() {
    //     city.value = "";
    //     state.value = "";
    //     country.value = "";
    //     img.style.display = "none";
    //     clearDOM();
    //   });


    // Call fetch for new cat image on load/refresh
    // window.onload = getWeather();

    // function to fetch weather data via openweathermap.org API
    async function getWeather() {
      try {

        const city = document.getElementById("search-city").value;
        const state = document.getElementById("search-state").value;
        const country = document.getElementById("search-country").value;

        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "," + country + "&units=imperial&APPID=dc0ed00f854b37bf62ac7b0d4f97ee2f", {mode: 'cors'});
        const currentData = await response.json();
        console.log(currentData);
        const currentWeather = {
            mainWeather: currentData.weather[0].main,
            place: currentData.name + ", " + state.toUpperCase() + " " + currentData.sys.country,
            temp: Math.round(currentData.main.temp),
            humidity: currentData.main.humidity + "%",
            wind: Math.round(currentData.wind.speed) + " MPH"
        };

        console.log(currentWeather);

        displayWeather(currentWeather);

        getGiphy(currentWeather.mainWeather);

      } catch (err) {
        alert("Something went wrong fetching weather data", err)
      };
    }

    // Function to display weather JSON data to DOM
    function displayWeather(currentWeather) {
        const displayDiv = document.querySelector(".display-div");

        // Call function to clear any DOM elements that may be present from previous search
        // clearDOM();

        // Create the elements in the DOM
        const city = document.createElement("p");
        city.textContent = currentWeather.place;
        content.appendChild(city);
        const status = document.createElement("p");
        status.textContent = currentWeather.mainWeather;
        content.appendChild(status);
        const cityTemp = document.createElement("p");
        cityTemp.textContent = currentWeather.temp + " Degrees";
        content.appendChild(cityTemp);
        const cityHumidity = document.createElement("p");
        cityHumidity.textContent = currentWeather.humidity + " Humidity";
        content.appendChild(cityHumidity);
        const cityWind = document.createElement("p");
        cityWind.textContent = currentWeather.wind + " Wind";
        content.appendChild(cityWind);
    }

    async function getGiphy(mainWeather) {
        try {
           const img = document.querySelector('img');
            let keyWord = mainWeather;
            const response = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=J0PlCznYydu6I6Zq9OJJvahZSLNZvMga&s=" + keyWord  + "weather", { mode: "cors" });
            const giphyResponse = await response.json();
            img.style.display = "";
            img.src = giphyResponse.data.images.original.url;
        } catch (err) {
            console.log("Something has went wrong when trying to fetch the giphy...", err);
        }
    }

    // function clearDOM() {
    //     // Clear the DOM if anything was present from a prior search
    //     const nodeList = document.querySelectorAll("p");
    //     if (nodeList !== null) {
    //         for (let i = 0; i < nodeList.length; i ++) {
    //             nodeList[i].remove();
    //         }
    //     }
    // }
}

