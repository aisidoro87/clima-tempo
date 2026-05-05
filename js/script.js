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
const forecastContainer = document.querySelector("#container-forecast");
const forecastItems = document.querySelector("#forecast-cards");

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

//Buscar climas para os próximos dias
const getForecastData = async (city) => {
    const apiForecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiForecastUrl);
    const data = await res.json();

    return data;

};

//função de busca por coordenadas
const getWeatherDataByCoords = async (lat, lon) => {
    // 1. Criamos a URL específica da API que aceita latitude (lat) e longitude (lon)
    const apiWeatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`;

    // 2. O 'fetch' faz a chamada para o servidor do OpenWeather
    const res = await fetch(apiWeatherUrl);

    // 3. Transformamos a resposta bruta em um objeto JavaScript (JSON) que conseguimos ler
    const data = await res.json();

    // 4. Retornamos esse objeto com todas as informações do clima
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
        const [weatherData, cityImage, forecastData] = await Promise.all([
            getWeatherData(city),
            getCityImage(city),
            getForecastData(city),
            delay(1500)
        ]);

        console.log(forecastData.list);

        // filtrar dados para os próximos dias
        const dailyForecast = forecastData.list.filter((item) => { // pegar apenas um horário por dia (12:00:00) e excluir o dia atual
            const date = new Date(item.dt_txt).getDate(); //
            const today = new Date().getDate(); // pegar o dia do mês da data atual
            return date !== today && item.dt_txt.includes("12:00:00"); // incluir apenas itens que não sejam do dia atual e que tenham horário 12:00:00
        });

        const nextFiveDays = dailyForecast.slice(0, 5); // pegar os dados dos próximos 5 dias.
        console.log(nextFiveDays);

        // limpar previsões antigas
        forecastItems.innerHTML = "";
        // criar cards para os próximos dias
        nextFiveDays.forEach((day) => { // para cada dia do forecast filtrado
            const date = new Date(day.dt_txt); // criar um objeto Date a partir do campo dt_txt da API, que é uma string com data e hora
            const dayName = date.toLocaleDateString("pt-BR", { weekday: "long" }); // pegar o nome do dia da semana em português (ex: "segunda-feira", "terça-feira", etc.)
            const temperature = Math.round(day.main.temp); // pegar a temperatura e arredondar para o número inteiro mais próximo
            const icon = day.weather[0].icon; // pegar o código do ícone do clima para aquele dia (ex: "01d", "02n", etc.)

            const forecastCard = document.createElement("div"); // criar um elemento div para cada card
            forecastCard.classList.add("forecast-card"); // adicionar a classe "forecast-card" para estilizar o card, algo como <div class="forecast-card"></div>
            forecastCard.innerHTML = ` 
                <div class="day">${dayName}</div>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${day.weather[0].description}" class="forecast-icon">
                <div class="temp">${temperature}°C</div>`; // preencher o conteúdo do card com o nome do dia, ícone do clima e temperatura

            forecastItems.appendChild(forecastCard); // adicionar o card ao contêiner de previsões
        });



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

//

//função que "pergunta" a localização ao navegador
const getUserLocation = () => {
    // 1. Verificamos se o navegador do usuário suporta geolocalização
    if (navigator.geolocation) {
        // 2. Pedimos a posição atual. O navegador mostrará aquele "pop-up" de permissão
        navigator.geolocation.getCurrentPosition(
            // --- Caso de SUCESSO ---
            async (position) => {
                // 3. Extraímos latitude e longitude do objeto 'position'
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // 4. Chamamos a função acima para pegar os dados do clima dessas coordenadas
                const data = await getWeatherDataByCoords(lat, lon);

                // 5. Chamamos a sua função 'showWeatherData' passando o nome da cidade que a API encontrou
                // Assim, todo o seu código de exibir ícones e trocar o fundo é reaproveitado!
                showWeatherData(data.name);

            },
            // --- Caso de ERRO (Usuário negou ou GPS falhou) ---
            (error) => {
                console.error("Erro ao obter localização:", error);

            }
        );
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
getUserLocation();