const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=5689b0e5963c68f2248c6dbcb104efd6" 
const imageURL = "https://openweathermap.org/img/wn/";

function loadWeather() {
  let zip = "83549";
  let cacheData = localStorage.getItem(zip+":weather");
  weatherCache = JSON.parse(cacheData);
  if(weatherCache != null && new Date(weatherCache.expires) > new Date()){
    updateWeatherSummary(weatherCache.data);
  }
  else{
    let apiUri = weatherApiUrl + "&zip=" + zip
    fetch(apiUri)
      .then((response) => response.json())
      .then((jsObject) => {
        var weatherCache = {};
        weatherCache.expires = new Date(new Date().getTime()+10*60000);
        weatherCache.data = jsObject;
        localStorage.setItem(zip+":weather",JSON.stringify(weatherCache));      
        
        updateWeatherSummary(weatherCache.data);
    });
  }
}

function updateWeatherSummary(data){
      
  var image = document.getElementById('weatherIcon');
  image.setAttribute('src', imageURL+data.weather[0].icon+"@2x.png");
  image.setAttribute('alt', data.weather[0].description);

  document.getElementById('summaryDescr').textContent = data.weather[0].main;
  document.getElementById('high-low').textContent = Math.round(data.main.temp_max) + " / " + Math.round(data.main.temp_min)+ " \xB0F";
  document.getElementById('temp').textContent = Math.round(data.main.temp)  + " \xB0F";    
  document.getElementById('precipitation').textContent = getRainfall(data) + " in";
  document.getElementById('windSpeed').textContent = Math.round(data.wind.speed) + " MPH";

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

loadWeather();