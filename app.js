const apiKey = 'kEYuiX6EYenc3LrcdmxEBsA9dOCI0odL';
const form = document.querySelector('form');
const card = document.querySelector('.card');
const input = document.querySelector('input');
const erro = document.querySelector('.error');

const getLocal = async (city) => {
  const response = await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`
  );

  const data = await response.json();

  return data[0];
};

const getCurrentConditions = async (localKey) => {
  const response = await fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${localKey}?apikey=${apiKey}`
  );
  const data = await response.json();

  return data;
};

const updateUI = async (e) => {
  e.preventDefault();

  const city = e.currentTarget.lastElementChild.value;

  try {
    const local = await getLocal(city);
    const localKey = local.Key;

    const localConditions = await getCurrentConditions(localKey);

    const localName = local.LocalizedName;
    const temperature = localConditions[0].Temperature.Metric.Value;
    const isDayTime = localConditions[0].IsDayTime;
    const icon = localConditions[0].WeatherIcon;
    const weatherText = localConditions[0].WeatherText;

    card.innerHTML = `
        <img src="./img/${isDayTime ? 'day' : 'night'}.svg" alt="" />
  
              <div class="icon-container">
                <img src="./icons/${icon}.svg" alt="" />
              </div>
  
              <div class="info">
                <h2>${localName}</h2>
                <span class="weather-info">${weatherText}</span>
                <span class="temperature">${temperature} °C</span>
              </div>
        `;

    input.value = '';
  } catch (Error) {
    erro.textContent = 'Something went wrong';
    setTimeout(() => {
      erro.textContent = '';
    }, 3000);
  }
};

form.addEventListener('submit', updateUI);
