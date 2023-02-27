// Variaveis e seleções de elementos
const apiKey = "868cb0846f513141426e27c1a5246eb4";
const countryApi = "https://countryflagsapi.com/png";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const weatherIcon = document.querySelector("#weather-icon");
const description = document.querySelector("#description");
const flagCountry = document.querySelector("#country");
const temperature = document.querySelector("#temperature span");
const umidity = document.querySelector("#umidity span");
const wind = document.querySelector("#wind span");
const weatherData = document.querySelector("#weather-data");

// Erros 
const error = document.querySelector("#error-message")

// Loader
const loader = document.querySelector("#loader");


// Funções
const getWeatherData = async(city) => {
    toggleLoader();
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const response = await fetch(apiWeatherURL);
    const data = await response.json();
    
    toggleLoader();
    
    return data;
}

const showWeatherData = async (city) => {
    hideInformation();
    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showMessageError();
        return;
      }

    cityElement.innerText = data.name;
    temperature.innerText = parseInt(data.main.temp);
    flagCountry.setAttribute("src", `${countryApi}/${data.sys.country}`);
    description.innerText = data.weather[0].description;
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    umidity.innerText = `${data.main.humidity}%`
    wind.innerText = `${data.wind.speed} Km/h`;
    
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherData.classList.remove("hide");
}

//tratamento de erros
const showMessageError = () => {
    error.classList.remove("hide");
}

const hideInformation = () => {
    error.classList.add("hide");
    weatherData.classList.add("hide");
}

//loader 
const toggleLoader = () => {
    loader.classList.toggle("hide");
}


//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
    if(e.code === 'Enter'){
        const city = e.target.value;
        showWeatherData(city);
 }
});
