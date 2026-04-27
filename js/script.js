// Variáveis
const apiKey = "f7e14bb76c0acdec0f3cacad46f13353";
const unsplashApiKey = "-51ppSwKgiryBGUK3dIgS-XnyladEVDPJ2DRaA7kkmQ";
const errorMessage = document.querySelector("#error-message");
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const temperatureElement = document.querySelector("#temperature span");
const descriptionElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const localTimeElement = document.querySelector("#local-time span");
const weatherDataContainer = document.querySelector("#weather-data");
const loading = document.querySelector("#loading");

// Delay
const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

// Buscar clima
const getWeatherData = async (city) => {
    const apiWeatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();

    return data;
};

// Buscar imagem da cidade
const getCityImage = async (city) => {
    const apiUnsplashUrl =
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`;

    const res = await fetch(apiUnsplashUrl);
    const data = await res.json();

    return data.results[0]?.urls?.regular || null;
};

// Aplicar background
const setBackgroundImage = (imageUrl) => {
    if (!imageUrl) return;

    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
};


// Mostrar clima
const showWeatherData = async (city) => {
    try {
        // mostrar loading
        loading.classList.remove("hide");

        // esconder clima antigo
        weatherDataContainer.classList.add("hide");

        // limpar erro
        errorMessage.textContent = "";
        errorMessage.style.display = "none";

        // buscar tudo ao mesmo tempo
        const [weatherData, cityImage] = await Promise.all([
            getWeatherData(city),
            getCityImage(city),
            delay(1500)
        ]);

        // cidade inválida
        if (String(weatherData.cod) === "404") {
            loading.classList.add("hide"); // esconder loading
            errorMessage.textContent = "Cidade não encontrada..."; // mostrar erro
            errorMessage.style.display = "block"; // mostrar mensagem de erro

            return;
        }

        // horário local
        const date = new Date();
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const localTime = new Date(utc + weatherData.timezone * 1000);

        // preencher dados
        cityElement.textContent = weatherData.name;
        temperatureElement.textContent =
            Math.round(weatherData.main.temp);

        descriptionElement.textContent =
            weatherData.weather[0].description; // descrição do clima

        weatherIconElement.src =
            `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`; // ícone do clima

        countryElement.src =
            `https://flagsapi.com/${weatherData.sys.country}/shiny/64.png`; // bandeira do país

        umidityElement.textContent =
            `${weatherData.main.humidity}%`; // umidade

        windElement.textContent =
            `${weatherData.wind.speed} km/h`; // velocidade do vento

        localTimeElement.textContent =
            localTime.toLocaleTimeString("pt-BR"); // horário local

        // aplicar imagem
        setBackgroundImage(cityImage); // aplicar imagem da cidade

        // esconder loading
        loading.classList.add("hide"); // esconder loading

        // mostrar clima
        weatherDataContainer.classList.remove("hide"); // mostrar clima

    } catch (error) {
        loading.classList.add("hide"); // esconder loading
        weatherDataContainer.classList.add("hide"); // esconder clima

        errorMessage.textContent =
            "Erro ao buscar dados. Tente novamente.";

        errorMessage.style.display = "block";

        console.error(error);
    }
};

// Evento botão
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value.trim(); // pegar valor do input e remover espaços extras

    // cidade inválida
    if (!city) {
        errorMessage.textContent =
            "Por favor, insira uma cidade válida.";
        errorMessage.style.display = "block";
        return;
    }

    showWeatherData(city);
});

// Evento Enter
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
