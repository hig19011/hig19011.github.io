
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';


fetch(requestURL)
  .then(function (response) {
        return response.json();
  })
  .then(function (jsonObject) {
    //console.table(jsonObject);  // temporary checking for valid response and data parsing

    const myTowns = ["Preston", "Fish Haven", "Soda Springs"]
    const towns = jsonObject['towns'];
    for(let i=0; i< towns.length; i++){
      if(myTowns.includes(towns[i].name)){
        let card = document.createElement('section');
        let textDiv = document.createElement('div');
        let factDiv = document.createElement('div');
        let h2 = document.createElement('h2');
        let photo = document.createElement('img');

        h2.textContent = towns[i].name;    
        photo.setAttribute('src',"images/"+towns[i].photo);
        photo.setAttribute('alt',"Picture of the " + towns[i].name + " area.");
        factDiv.classList.toggle('facts');
        
        textDiv.appendChild(h2);
        factDiv.appendChild(createSpan("Year Founded: "));
        factDiv.appendChild(createSpan(towns[i].yearFounded, "val"));
        factDiv.appendChild(createSpan("Place of Birth: "));
        factDiv.appendChild(createSpan(towns[i].currentPopulation, "val"));
        factDiv.appendChild(createSpan("Annual Rainfall: "));
        factDiv.appendChild(createSpan(towns[i].averageRainfall, "val"));
        textDiv.appendChild(factDiv);
        textDiv.appendChild(createSpan(towns[i].motto,"motto"));
        card.appendChild(textDiv);
        card.appendChild(photo);
        
        document.querySelector('div.cards').appendChild(card);
      }
    }

    function createSpan(text, className){
      let span = document.createElement('span');
      span.textContent = text;      
      if(className != undefined)
        span.classList.toggle(className);
      return span     
    }

  });