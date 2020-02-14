let now = new Date();
let longDate = now.toLocaleDateString('en-us', {weekday: 'long'}) + ", " + now.toLocaleDateString('en-us', { day:'numeric'}) + " " + now.toLocaleDateString('en-us', {month:'long'}) + " " + now.toLocaleDateString('en-us', {year:'numeric'});
document.getElementById("currentDate").innerHTML = longDate;



if(now.getDay() == 5)  //Show if Friday
{
  var announcements = document.getElementsByClassName("announcement");
  var announcement = announcements[0];
  if(announcement != undefined)
    announcement.classList.remove("hide");
}

function toggleMenu() {
  console.log(document.getElementById("primaryNav").classList);
  document.getElementById("primaryNav").classList.toggle("hide");
}

function calculateWindChillFactor(t,s){
  return 35.74 + .6215*t - 35.75*Math.pow(s,0.16) + .4275*t*Math.pow(s,.016)
}