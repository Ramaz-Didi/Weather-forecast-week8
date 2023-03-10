var today=(moment().format("D/M/YYYY"));
let lat;
let lon;
var searchedCities=["Searched City","Searched City","Searched City","Searched City","Searched City","Searched City"];
let currentEl=document.querySelector("#current");
var iconEl = document.createElement("img");
var forecastIconEl=[]; 
var historyButtonEl=[]
if ( localStorage.length >0 ){
  var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
  }
for (let i = 0; i <= 5; i++) {
  // console.log(searchedCities[i]);
  forecastIconEl[i]=document.createElement("img");
  historyButtonEl[i]=document.createElement("button");
  buttonName="#historyBtn"+[i]
  document.querySelector(buttonName).textContent=searchedCities[i];
}

document.querySelector("#search-button").addEventListener("click", function(event) {
  // Preventing the submit button from trying to submit the form
  event.preventDefault();
  var cityName = document.querySelector("#search-input").value;
  if (cityName !== "")
  {
    city(cityName);
  };
  
      
  });
  
  function city(city){
    
    var cityQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=5&appid=426bcfa64de6ba8887447e7026d9ce4a";
  fetch(cityQueryURL)
  .then(response => response.json())
  .then(data =>{
    
    // document.querySelector("#search-input").textContent=JSON.stringify
    if (data == '') {
      document.querySelector("#search-result").textContent="no city found, please try again";
      return
    };
        for (let j = 4; j>=0; j--){
            searchedCities[j+1]=searchedCities[j];
          }
          searchedCities[0]=city;
          console.log(searchedCities)
          
          localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
          refreshCityNames()
          
          var lat=data[0].lat;
          var lon=data[0].lon;
    queryCurrentURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=426bcfa64de6ba8887447e7026d9ce4a";
    queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&appid=426bcfa64de6ba8887447e7026d9ce4a";
    queryURL=queryCurrentURL;
    return(fetch(queryURL));
    
  })
  .then(response => response.json())
  .then(data =>{
    let responseData=data;
    
    currentEl.textContent=city+"("+moment(data.dt,"X").format("D/M/YYYY")+")";
    document.querySelector("#currentTemp").textContent="Temp "+(responseData.main.temp)+" ??C";
    document.querySelector("#currentWind").textContent="Wind "+Math.round(responseData.wind.speed*3.6* 100)/100+" KPH";
    document.querySelector("#currentHumidity").textContent="Humidity "+responseData.main.humidity+" %";
    currentEl.appendChild(iconEl);
    let iconUrl="http://openweathermap.org/img/wn/"+responseData.weather[0].icon+"@2x.png"
    iconEl.setAttribute("src",iconUrl);
    currentEl.appendChild(iconEl);
    queryURL=queryForecastURL;
    return(fetch(queryURL));
  })
  .then(response => response.json())
  .then(data =>{
    for (let i = 0; i < 5; i++) {
      let responseData=data.list[i*8+4];
      cardName="#forecast"+(i+1);
      
      let forecastEl=document.querySelector(cardName+"icon");
      // console.log(cardName+"icon");
      document.querySelector(cardName).textContent=moment(responseData.dt,"X").format("D/M/YYYY");
      document.querySelector(cardName+"Temp").textContent="Temp "+(responseData.main.temp)+" ??C";
      document.querySelector(cardName+"Wind").textContent="Wind "+Math.round(responseData.wind.speed*3.6* 100)/100+" KPH";
      document.querySelector(cardName+"Humidity").textContent="Humidity "+responseData.main.humidity+" %";
      
      let iconUrl="http://openweathermap.org/img/wn/"+responseData.weather[0].icon+"@2x.png";
      forecastIconEl[i].setAttribute("src",iconUrl);
      forecastEl.appendChild(forecastIconEl[i]);
      

      
    }
  })
function refreshCityNames(){
  for (let i = 0; i <= 5; i++) {
    buttonName="#historyBtn"+[i]
    document.querySelector(buttonName).textContent=searchedCities[i];
  }
}


}; //-----------------end of programme
