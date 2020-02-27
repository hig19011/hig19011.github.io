function calculateWindChillFactor(t,s){
  return 35.74 + .6215*t - 35.75*Math.pow(s,0.16) + .4275*t*Math.pow(s,.016)
}

// find and display the windchill 
let temp = document.getElementById("temp").textContent;
let windSpeed = document.getElementById("windSpeed").textContent;
let windSpeedSymbol = document.getElementById("windChillSymbol");
let windChill = "N/A"
if(parseFloat(temp) <= 50.0 && parseFloat(windSpeed) >= 3.0) {  
  windChill = calculateWindChillFactor(temp,windSpeed);
  document.getElementById("windChill").textContent = windChill.toFixed(0);
  if(windSpeedSymbol.classList.contains("hide"))
    windSpeedSymbol.classList.remove("hide");
}
else {
  document.getElementById("windChill").textContent = windChill;
  if(!windSpeedSymbol.classList.contains("hide"))
    windSpeedSymbol.classList.add("hide");

}
