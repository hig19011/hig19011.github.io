const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=5689b0e5963c68f2248c6dbcb104efd6" 
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=5689b0e5963c68f2248c6dbcb104efd6" 
const imageURL = "https://openweathermap.org/img/wn/";

function loadCityWeather(id, queryBy) {
  let cacheData = localStorage.getItem(id+":"+queryBy+":weather")
  weatherCache = JSON.parse(cacheData);
  if(weatherCache != null && new Date(weatherCache.expires) > new Date()){
    updateWeatherSummary(weatherCache.data);
  }
  else{
    let apiUri = makeWeatherUri(weatherApiUrl, id, queryBy);
    fetch(apiUri)
      .then((response) => response.json())
      .then((jsObject) => {
        var weatherCache = {};
        weatherCache.expires = new Date(new Date().getTime()+10*60000);
        weatherCache.data = jsObject;
        localStorage.setItem(id+":"+queryBy+":weather",JSON.stringify(weatherCache));      
        
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
  if(typeof rain["3h"] !== "undefined")
    return rain["3h"];
  if(typeof rain["1h"] !== "undefined")
    return rain["1h"];
  return 0;
}

function makeWeatherUri(url, id, queryBy){
  if(queryBy == "zip"){
    return url + "&zip="+ id;
  }
  return url + "&id="+ id;  
}

function loadCityForecast(id, queryBy, elementId){
  let cacheData = localStorage.getItem(id+":"+queryBy+":forecast")
  let forecastCache = JSON.parse(cacheData);
  if(forecastCache != null && new Date(forecastCache.expires) > new Date()){
    updateForecast(forecastCache.data, elementId);
  }
  else {
    let apiUri = makeWeatherUri(forecastApiUrl, id, queryBy);;
    fetch(apiUri)
      .then((response) => response.json())
      .then((jsObject) => {
        var forecastCache = {};
        forecastCache.expires = new Date(new Date().getTime()+10*60000);
        forecastCache.data = jsObject;
        localStorage.setItem(id+":"+queryBy+":forecast",JSON.stringify(forecastCache));     
        updateForecast(forecastCache.data, elementId);
    });
  }
}

function updateForecast(data, elementId) {
  const forecastData = data.list.filter(x=> x.dt_txt.includes('18:00:00'));
  var layout = document.getElementById(elementId);
  var header = layout.getElementsByTagName("h3");
  if(header.length > 0)
  { 
    var h3 = header[0].cloneNode(true);
    layout.innerHTML = '';
    layout.appendChild(h3);
  }
  else {
    layout.innerHTML = '';
  }

  forecastData.forEach(day => {
    var cell = document.createElement('div');
    cell.classList.toggle('cell');

    var dayName = document.createElement('p');
    dayName.textContent = getDayOfWeek(new Date(day.dt_txt).getDay())
    dayName.classList.toggle('day');

    var image = document.createElement('img');
    image.setAttribute('src', imageURL+day.weather[0].icon+".png");
    image.setAttribute('alt', day.weather[0].description);

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