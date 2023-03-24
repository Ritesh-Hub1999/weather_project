// console.log('Hello jee');
// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

// async function showWeather(){
//     try{
//         let city = "goa";

//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

//     const data = await response.json();
//     console.log("weather data:->" , data);

//     //UI Mai temperature dikhana ka lia below code likha hai
//     // let newPara = document.createElement('p');
//     // newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`

//     // document.body.appendChild(newPara);
//     }
//     catch(err){
        
//     }
    
// }


// function getCurrLoc(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log('No geoLocation found');
//     }
// }

// function showPosition(position){
//     let lat = position.coords.latitude;
//     let longi = position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");

const userContainer = document.querySelector(".weather-container");
const grantAcessContainer = document.querySelector(".grant-location-container");

const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");

const userInfoContainer = document.querySelector(".user-info-container");

//initially variable needed?
let currentTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");


function switchTab(clcikedTab){
    if(clcikedTab != currentTab){
        //tab switch kar rha tha tho color hath raha hai background color us particular tab ka
        currentTab.classList.remove("current-tab");
        currentTab = clcikedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            //kya search form wala container is invisible, if yes make it visible
            userInfoContainer.classList.remove("active");
            grantAcessContainer.classList.remove("active");
            searchForm.classList.add("active"); 
        } 
        else{
            //mai pehla search wala tab par tha ab your weather tab visible karna hai
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab mai your weather tab mai agaya tho apne area ka weather bhi display karna hoga,
            //so hama local storage check karna hoga apne area ka cooridnates ka lia
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click",()=>{
    //pass click tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
    //pass click tab as an input parameter
    switchTab(searchTab);
});

//check if cordinates are already pressent in session/local storage
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");

    //agar local coordinates nai mila yani coordinate save nai hai means location ka access nai dia hai
    if(!localCoordinates){
        grantAcessContainer.classList.add("active");
    }
    else{
        //json.parse jason string ko json object mai convert karta hai
        const coordinate = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinate);
    }
}

async function fetchUserWeatherInfo(coordinate){
    const {lat,lon} = coordinate;

    //make grant container invisible
    grantAcessContainer.classList.remove("active");

    //make loader visible
    loadingScreen.classList.add("active");

    //API call
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
        rendorWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
    }
}

function rendorWeatherInfo(weatherInfo){
    //pehla hama elementh lana hoga tb data jo aya hai wo daal painga
    const cityName = document.querySelector("[data-cityName]");
    const countyIcon = document.querySelector("[data-contry-icon]");
    const desc = document.querySelector("[data-weatherDec]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector(["data-humidity"]);
    const cloudiness = document.querySelector(["data-cloudiness"]);

    //fetch value from weatherINFO object and put it on UI elements.
    cityName.innerText = weatherIcon?.name;
    countyIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherIcon?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherIcon?.main?.temp;
    windspeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{

    }
}

function showPosition(position){
    const userCoordinates = {
        lat : position.coords.latitude,
        longi : position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener('click',getLocation);

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = searchInput.ariaValueMax;

    if(cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city){
    //loader ko active karna hai pehla
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAcessContainer.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        //response ata hi loader hata do
        loadingScreen.classList.remove("active");
        //weather dikhana ka lia userInfoContainer addd karna hoga
        userInfoContainer.classList.remove("active");
        //UI mai display karana ka lia hum yeah rendor function call karenga
        rendorWeatherInfo(data);
    }
    catch(err){

    }
}





























