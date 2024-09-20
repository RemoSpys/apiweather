import axios from 'axios';

const openWeatherMapAPI = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: '0433414b6e078a6eda55dc0341afaecb'
    }
});

export default openWeatherMapAPI;
