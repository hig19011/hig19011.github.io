const apiURL = "http://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=5689b0e5963c68f2248c6dbcb104efd6";
fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);   
    document.getElementById('current-temp').textContent = jsObject.main.temp;
    const imageSource = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + ".png";
    const desc = jsObject.weather[0].description;
    document.getElementById('imagesrc').textContent = imageSource;
    document.getElementById('icon').setAttribute('src', imageSource);
    document.getElementById('icon').setAttribute('alt', desc);
  });




