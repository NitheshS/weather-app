function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  if (!city) {
    resultDiv.innerHTML = "<p class='error'>Please enter a city name.</p>";
    return;
  }

  const apiKey = "c7a0571b3195adced5af09b7efd0bf7c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      resultDiv.innerHTML = `
        <img src="${icon}" alt="weather icon" />
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.main.temp}°C</strong></p>
        <p>${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
      `;
    })
    .catch((err) => {
      resultDiv.innerHTML = `<p class='error'>${err.message}</p>`;
    });
}
