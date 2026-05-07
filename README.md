# 🌤️ Clima Tempo

![GitHub repo size](https://img.shields.io/github/repo-size/seu-usuario/clima-tempo?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/seu-usuario/clima-tempo?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/seu-usuario/clima-tempo?style=for-the-badge)

Um aplicativo web moderno e responsivo para consulta de previsão do tempo em tempo real, utilizando APIs externas para fornecer dados precisos e uma experiência visual dinâmica.

## 🚀 Funcionalidades

- **📍 Geolocalização Automática**: Detecta sua localização atual ao abrir o app para exibir o clima local instantaneamente.
- **🔍 Busca Global**: Pesquise o clima de qualquer cidade do mundo pelo nome.
- **📅 Previsão Estendida**: Visualize a previsão detalhada para os próximos 5 dias.
- **🌡️ Dados em Tempo Real**: Temperatura, umidade, velocidade do vento e descrição das condições climáticas.
- **🕒 Horário Local**: Exibe a hora certa da cidade pesquisada, considerando o fuso horário.
- **🖼️ Background Dinâmico**: A imagem de fundo se adapta automaticamente à cidade pesquisada (via Unsplash API).
- **⏳ Feedback de Carregamento**: Indicador visual (spinner) enquanto os dados são processados.
- **📱 Design Responsivo**: Interface otimizada para dispositivos móveis, tablets e desktops.
- **⚠️ Tratamento de Erros**: Mensagens amigáveis para cidades não encontradas ou falhas de conexão.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3 (Flexbox/Grid), JavaScript ES6+
- **Ícones**: [Font Awesome](https://fontawesome.com/)
- **Tipografia**: [Google Fonts](https://fonts.google.com/)

## 🌐 APIs Integradas

- **[OpenWeatherMap](https://openweathermap.org/api)**: Consumo de dados meteorológicos e previsões.
- **[Unsplash API](https://unsplash.com/developers)**: Busca de imagens contextuais para o fundo da página.
- **[FlagsAPI](https://flagsapi.com/)**: Exibição das bandeiras dos países correspondentes.

## 📂 Estrutura do Projeto

```text
clima-tempo/
├── css/
│   └── style.css      # Estilização e responsividade
├── js/
│   └── script.js     # Lógica de consumo de APIs e DOM
├── index.html         # Estrutura principal
└── README.md          # Documentação
```

## 🔧 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/clima-tempo.git
   ```
2. **Abra o projeto:**
   Navegue até a pasta e abra o arquivo `index.html` em seu navegador.

> **Nota:** Para o funcionamento completo do background dinâmico e dados climáticos, é necessário possuir chaves de API válidas (já configuradas no script para demonstração).

## 🔮 Próximas Implementações

- [ ] **Histórico de Buscas**: Armazenar as últimas cidades pesquisadas usando `LocalStorage`.
- [ ] **Temas Baseados no Clima**: Alterar as cores do app conforme o clima (ex: tons quentes para sol, frios para chuva).
- [ ] **Proteção de Credenciais**: Migrar chaves de API para variáveis de ambiente ou um backend simples.

---
Desenvolvido com ❤️ por [Seu Nome/GitHub]

