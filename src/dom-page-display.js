export function initializeWebsite() {
    const content = document.getElementById('content');
    content.replaceChildren();

    content.appendChild(createTitle("Weather"));


    const img = document.querySelector('img');
    // const catGiphy = document.querySelector('.get-cat-giphy');
    const searchBtn = document.querySelector('.search-button');
    const resetBtn = document.querySelector('.reset-button');
    const city = document.getElementById("search-city").value;
    const state = document.getElementById("search-state").value;
    const country = document.getElementById("search-country").value;

    searchBtn.addEventListener("click", getWeather);
    resetBtn.addEventListener("click", function clearSearch() {
        city.value = "";
        state.value = "";
        country.value = "";
      });


    // Call fetch for new cat image on load/refresh
    // window.onload = getWeather();

    // catGiphy.addEventListener("click", getCats);

    // function to fetch new cat GIPHY via their API
    async function getWeather() {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + "," + state + "," + country + "&units=imperial&dc0ed00f854b37bf62ac7b0d4f97ee2f", {mode: 'cors'});
        const weatherData = await response.json();
        return weatherData;
      } catch (err) {
        console.log("Something went wrong fetching weather data", err)
      };
    }
}

