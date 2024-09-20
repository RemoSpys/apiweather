import chuckNorrisAPI from "./services/ChuckNorriesAPI.js";
import openWeatherMapAPI from "./services/openWeatherAPI.js";

const RandomJokeHTMLElement = document.querySelector('.random-jokes');
const CategoriesHTMLElement = document.querySelector('#categories');
const buttomeElement = document.querySelector('.generate-joke-button');
const searchElement = document.querySelector('#search');
const searchResultWrapper = document.querySelector('.search-results');
const resultCountWrapper = document.querySelector('.result-count');
const weatherResult = document.getElementById('weather-result');
const getWeatherBtn = document.getElementById('get-weather-btn');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');

let selectedCategory = null;

const fetchRandomJokes = async (category = '') => {
    try {
        // Muuda URL-i, et väldiksime vigaseid päringuid
        const url = category ? `/random?category=${category}` : '/random';
        const response = await chuckNorrisAPI.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Something went terrible wrong!');
    }
};

const OptionCategory = async () => {
    try {
        const response = await chuckNorrisAPI.get(`/categories`);
        return response.data;
    } catch (error) {
        throw new Error('Something went terrible wrong!');
    }
};

const displayRandomJoke = async () => {
    const joke = await fetchRandomJokes(selectedCategory);
    RandomJokeHTMLElement.textContent = joke.value;
};

const fillSelectWithOptions = async () => {
    const categories = await OptionCategory();
    if (!categories) return;
    categories.forEach((category) => {
        const option = new Option(category, category);
        CategoriesHTMLElement.append(option);
    });
};

CategoriesHTMLElement.addEventListener('change', async (event) => {
    selectedCategory = event.currentTarget.value;
    const response = await fetchRandomJokes(selectedCategory);
    RandomJokeHTMLElement.textContent = response.value;
});

buttomeElement.addEventListener('click', async (event) => {
    const response = await fetchRandomJokes(selectedCategory);
    RandomJokeHTMLElement.textContent = response.value;
});

searchElement.addEventListener('input', async (event) => {
    if (event.currentTarget.value.length < 3) return;
    const response = await searchQuery(event.currentTarget.value);
    console.log(response.result);
    const resultCountPrural = response.total === 1 ? 'nali' : 'nalja';
    resultCountWrapper.innerText = `Leitud ${response?.total} ${resultCountPrural}.`;
});

const searchQuery = async (query) => {
    const response = await chuckNorrisAPI.get(`/search?query=${query}`);
    return response.data;
};

const fetchWeather = async () => {
    try {
        const response = await openWeatherMapAPI.get(`/weather?q=Kuressaare&units=metric`);
        const data = response.data;
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        weatherDescription.textContent = data.weather[0].description;
        temperature.textContent = `Temperatuur: ${data.main.temp}°C`;
        weatherResult.style.display = 'block';
    } catch (error) {
        console.log(error); 
        alert('Ilmateenuse päring ebaõnnestus. Veenduge, et API võti on korrektne ja URL on õige.');
        weatherResult.style.display = 'none';
    }
};

getWeatherBtn.addEventListener('click', fetchWeather);

fetchRandomJokes();
displayRandomJoke();
fillSelectWithOptions();
