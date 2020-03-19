const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

function buildEvents (townName, jsonObject) {
  const town = jsonObject['towns'].filter(x=>x.name == townName);
  if(town.length == 0) {
    return;
  }

  let card = document.getElementById('localEvents');
  let h3 = document.createElement('h3');
  let div = document.createElement('div');
  div.classList.toggle('local-event-list')
  
  town[0].events.forEach(event => {
    let eventData = event.split(":")
    let daySpan = document.createElement("span");
    let infoSpan = document.createElement("span");
    daySpan.textContent = eventData[0]+":";
    daySpan.classList.toggle('event-day')
    div.appendChild(daySpan);
    infoSpan.textContent = eventData[1];
    infoSpan.classList.toggle('event-info')    
    div.appendChild(infoSpan);
    
  })

  h3.textContent = "Upcoming Events";
  card.appendChild(h3);
  card.appendChild(div)
  

}

function getTownEvents(town){
  fetch(requestURL)
    .then(function (response) {
          return response.json();
    })
    .then(buildEvents.bind(null, town));
}