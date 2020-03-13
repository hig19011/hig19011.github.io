const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=5689b0e5963c68f2248c6dbcb104efd6" 
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=5689b0e5963c68f2248c6dbcb104efd6" 
const imageURL = "https://openweathermap.org/img/w/";

function loadCityWeather(cityId) {
  let cacheData = localStorage.getItem(cityId+":weather")
  weatherCache = JSON.parse(cacheData);
  if(weatherCache != null && new Date(weatherCache.expires) > new Date()){
    updateWeatherSummary(weatherCache.data);
  }
  else{
    let apiUri = weatherApiUrl + "&id="+ cityId;
    fetch(apiUri)
      .then((response) => response.json())
      .then((jsObject) => {
        var weatherCache = {};
        weatherCache.expires = new Date(new Date().getTime()+10*60000);
        weatherCache.data = jsObject;
        localStorage.setItem(cityId+":weather",JSON.stringify(weatherCache));      
        
        updateWeatherSummary(weatherCache.data);
    });
  }
}

function updateWeatherSummary(data){
      
  document.getElementById('summaryDescr').textContent = data.weather[0].main;
  document.getElementById('highTemp').textContent = Math.round(data.main.temp_max);
  document.getElementById('temp').textContent = Math.round(data.main.temp);  
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('precipitation').textContent = getRainfall(data);
  document.getElementById('windSpeed').textContent = Math.round(data.wind.speed);

  setWindChill();
}

function getRainfall(data){
  rain = data.rain;
  if(typeof rain === "undefined")
    return 0;
  if(typeof rain.h3 !== "undefined")
    return rain.h3;
  if(typeof rain.h1 !== "undefined")
    return rain.h1;
  return 0;
}


function loadCityForecast(cityId){
  let cacheData = localStorage.getItem(cityId+":forecast")
  let forecastCache = JSON.parse(cacheData);
  if(forecastCache != null && new Date(forecastCache.expires) > new Date()){
    updateForecast(forecastCache.data);
  }
  else {
    let apiUri = forecastApiUrl + "&id="+ cityId;
    fetch(apiUri)
      .then((response) => response.json())
      .then((jsObject) => {
        var forecastCache = {};
        forecastCache.expires = new Date(new Date().getTime()+10*60000);
        forecastCache.data = jsObject;
        localStorage.setItem(cityId+":forecast",JSON.stringify(forecastCache));     
        updateForecast(forecastCache.data);
    });
  }
}

function updateForecast(data) {
  const forecastData = data.list.filter(x=> x.dt_txt.includes('18:00:00'));
  var layout = document.getElementsByClassName('forecast_layout')[0];
  layout.innerHTML = '';

  forecastData.forEach(day => {
    var cell = document.createElement('div');
    cell.classList.toggle('cell');

    var dayName = document.createElement('p');
    dayName.textContent = getDayOfWeek(new Date(day.dt_txt).getDay())
    dayName.classList.toggle('day');

    var image = document.createElement('img');
    image.setAttribute('src', imageURL+day.weather[0].icon+".png");
    image.setAttribute('alt', day.weather.description);

    var temp = document.createElement('p');
    temp.textContent = Math.round(day.main.temp) + " \xB0F";
    temp.classList.toggle('temp');

    cell.appendChild(dayName);
    cell.appendChild(image);
    cell.appendChild(temp);

    layout.appendChild(cell);
  });
}

function getDayOfWeek(day)
{
    switch(day) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tues";
      case 3:
        return "Wed";
      case 4:
        return "Thr";
      case 5:
        return "Fri";
      case 6:
        return "Sat";     
    }
}