let input = document.getElementById("search-input");
let button = document.getElementById("search-btn");
let area = document.getElementById("location");
let temprature = document.getElementById("temprature");
let weatherOverview = document.getElementById("weather-overview");
let time = document.getElementById("time");
let image = document.getElementById("image");
let headlines = document.getElementById("headlines");
let desc = document.getElementById("desc");
let themeToggle = document.getElementById("theme-toggle");
let current = document.getElementById("current-btn");


let getCurrentData = async (lat , long) => {
  try {
    let promise = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=eaebedefc49047539ac192819240806&q=${lat} ,${long}&aqi=yes`
    );
    return await promise.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

let getHeadlines = async (cityName) => {
    try {
        let promise = await fetch(`https://api.weatherapi.com/v1/alerts.json?key=eaebedefc49047539ac192819240806&q=${cityName}`)
        return await promise.json();
    }
    catch (error){
        console.log("Error fetching the background colour equal equal to white two nature style background colour white doggy style Black White background White white what the hell headlines", error);        
    }
}

//Current user location : 

let gotLocation = async (position) => {
  let result = await getCurrentData(position.coords.latitude, position.coords.longitude);
  console.log(result); area.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
  alert("Fetching for your location , Please wait ")
     // Update temperature
  temprature.innerText = `${result.current.temp_c}°C`;

  // Update weather overview
  weatherOverview.innerText = `${result.current.condition.text}`;

  // Update local time
  time.innerText = `${result.current.last_updated}`;

  // Update weather icon
  image.src = `https:${result.current.condition.icon}`;
    image.alt = `${result.current.condition.text}`;
    
    try {
      let description = await getHeadlines(value);
      headlines.innerText = `Headline - ${description.alerts.alert[0].headline}`;
      desc.innerText = `Description: ${description.alerts.alert[0].desc}`
  }
  catch {
      headlines.innerText = `No Headlines available for this !`;
      desc.innerText = `No Description available for this !`;
      alert("Failed to fetch headines");  
  }
  
}

//Styling current location button:
current.style.backgroundColor = "red";
current.style.border = "none";
current.style.paddingLeft = "10px";
current.style.paddingRight = "10px";
current.style.paddingTop = "8px";
current.style.paddingBottom = "8px";
current.style.borderRadius = "10px";
current.style.fontSize = "17px";
current.style.marginTop = "16px";

let failedToGet = () => {
  console.log("Sorry, ...can't fetch");
}

current.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
})

button.addEventListener("click", async () => {

  let value = input.value;
  if (!value) {
    return;
  }
  try {
    let result = await getCurrentData(value);
    console.log(result);

    // Update location info
    area.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;

    // Update temperature
    temprature.innerText = `${result.current.temp_c}°C`;

    // Update weather overview
    weatherOverview.innerText = `${result.current.condition.text}`;

    // Update local time
    time.innerText = `${result.current.last_updated}`;

    // Update weather icon
    image.src = `https:${result.current.condition.icon}`;
    image.alt = `${result.current.condition.text}`;

  } catch (error) {
    alert("Could not fetch weather details. Please try again!");
  }
    try {
        let description = await getHeadlines(value);
        headlines.innerText = `Headline - ${description.alerts.alert[0].headline}`;
        desc.innerText = `Description: ${description.alerts.alert[0].desc}`
    }
    catch {
        headlines.innerText = `No Headlines available for this !`;
        desc.innerText = `No Description available for this !`;
        alert("Failed to fetch headines");  
    }
});


// Dark-light theme: 
let theme = document.getElementById("body-container");

themeToggle.style.border = "none";
themeToggle.style.padding = "7px";
themeToggle.style.paddingLeft = "13px";
themeToggle.style.paddingRight = "13px";
themeToggle.style.borderRadius = "8px";
themeToggle.style.marginTop = "-4px";
theme.style.backgroundColor = "white";

themeToggle.style.background = "black";
themeToggle.style.color = "white";


themeToggle.addEventListener("click", () => {
    
    
    if (theme.style.backgroundColor == "white")
    {
        console.log(theme.style.backgroundColor);
        theme.style.backgroundColor = "#181818";
        area.style.color = "white";
        time.style.color = "white";
        temprature.style.color = "white";
        weatherOverview.style.color = "white";
        desc.style.color = "white";
        headlines.style.color = "white";
        input.style.background = "orange";
        themeToggle.style.background = "white";
        themeToggle.style.color = "black";
    }
    else
    {
        theme.style.backgroundColor = "white";
        area.style.color = "black";
        time.style.color = "black";
        temprature.style.color = "black";
        weatherOverview.style.color = "black";
        desc.style.color = "black";
        headlines.style.color = "black";
        input.style.background = " rgb(226, 120, 235)";
        themeToggle.style.background = "black";
        //This line's effect is not getting reflected
        themeToggle.style.color = "white";
    }
});









