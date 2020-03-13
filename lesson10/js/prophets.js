
const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';


fetch(requestURL)
  .then(function (response) {
        return response.json();
  })
  .then(function (jsonObject) {
    //console.table(jsonObject);  // temporary checking for valid response and data parsing

    const prophets = jsonObject['prophets'];
    for(let i=0; i< prophets.length; i++){
      let card = document.createElement('section');
      let h2 = document.createElement('h2');
      let pBirthDate = document.createElement('p');
      let pBirthPlace = document.createElement('p');
      let photo = document.createElement('img');

      h2.textContent = prophets[i].name + ' ' + prophets[i].lastname;
      pBirthDate.textContent = "Date of Birth: " + prophets[i].birthdate;
      pBirthPlace.textContent = "Place of Birth: " + prophets[i].birthplace;
      photo.setAttribute('src',prophets[i].imageurl);
      photo.setAttribute('alt',prophets[i].name + ' ' + prophets[i].lastname + ' - ' + prophets[i].order);
      
      card.appendChild(h2);
      card.appendChild(pBirthDate);
      card.appendChild(pBirthPlace);
      card.appendChild(photo);
      
      document.querySelector('div.cards').appendChild(card);

    }

  });