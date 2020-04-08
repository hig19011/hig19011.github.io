
const requestURL = 'guides.json';


fetch(requestURL)
  .then(function (response) {
        return response.json();
  })
  .then(function (jsonObject) {
    //console.table(jsonObject);  // temporary checking for valid response and data parsing
    let main = document.getElementById('main');
    let mainHeader = document.createElement('h2');
    mainHeader.textContent = "Guides";
    main.appendChild(mainHeader);

    const guides = jsonObject['guides'];
    for(let i=0; i< guides.length; i++){
      let guide = guides[i];
      
      let section = document.createElement('section');
      let name = document.createElement('h3');

      let picture = document.createElement('picture');
      var source = document.createElement('source');
      var image = document.createElement('img');

      name.textContent = guide.name;
      section.appendChild(name);

      source.srcset = guide.imageurllarge;
      source.media = "(min-width: 54em)"
      image.src = guide.imageurl;
      image.alt = guide.imagedescr;
      picture.appendChild(source);
      picture.appendChild(image);
      section.appendChild(picture);      

      addInfo(section,"Certification: ",guide.certlevel)
      addInfo(section,"Years of Experience: ",guide.yearexp)
      addInfo(section,"Email: ",guide.email)
      addInfo(section,"Bio: ",guide.bio)
      for(let j=0; j<guide.preferences.length; j++){
        let preference = guide.preferences[j]
        addInfo(section,preference.label,preference.pref)
      }      

      section.classList.toggle("guideInfo")
      section.classList.toggle("clearfix")
      main.appendChild(section);      
    }
  });

  function addInfo(parent, label, details){
    let p = document.createElement("p");
    let span = document.createElement("span");
    span.textContent = label;
    span.classList.toggle("guide-label");
    p.appendChild(span);

    let textNode = document.createTextNode(details)
    p.appendChild(textNode);
    
    parent.appendChild(p);
  }