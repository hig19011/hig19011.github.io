let now = new Date();
let longDate = now.toLocaleDateString('en-us', {weekday: 'long', day:'numeric', month:'long', year:'numeric'});
document.getElementById("currentDate").innerHTML = longDate;

function toggleMenu() {
  console.log(document.getElementById("primaryNav").classList);
  document.getElementById("primaryNav").classList.toggle("hide");
}