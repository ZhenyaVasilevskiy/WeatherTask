let apiKey = "24b62629b6fe44aedd294b36c621018e";
let cityName = document.getElementById("city_name");
var interface = document.getElementById("window");
var prevCityName;
let last_podcast = null;
let message = null;

function getWeather(){
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName.value + "&APPID=" + apiKey)
    .then(result => {
        return result.json();
    })
    .then(result => {
        if(prevCityName != cityName.value)
        console.log(result);
            if (last_podcast != null && result.cod != "404")    
            {
                $(last_podcast).fadeOut("slow").hide("slow")
                .queue(function(){
                outputResult(result);
                $(this).dequeue();
                }); 
            }
            else 
                if(last_podcast == null && result.cod != "404"){
                    outputResult(result);
                }
                else 
                    if(last_podcast != null && result.cod == "404")
                    {              
                        last_podcast.style.display = "none";
                        outputError(result);
                    }
                    else 
                        if(last_podcast == null && result.cod == "404")
                        {
                            outputError(result);
                        }
    })
}

function outputResult(result)
{

    $('#city').text(result.name);
    $('#main').text(result.weather[0].main);

    document.getElementById("picture").src = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png"

    var window = document.getElementById("information_table");
    var temperature = document.createElement("li");

    temperature.append("temperature: " + Math.round(result.main.temp - 273) + " C");
    window.replaceChild(temperature, window.children[0]);

    var humidity = document.createElement("li");
    humidity.append("humidity: " + result.main.humidity);
    window.replaceChild(humidity, window.children[1]);

    var wind_speed = document.createElement("li");
    wind_speed.append("wind speed: " + result.wind.speed + "m/s");
    window.replaceChild(wind_speed, window.children[2]);

    var podcast_block = document.getElementById("information_desk");

    $(podcast_block).show("slow").fadeIn("slow");
    prevCityName = cityName.value;
    last_podcast = podcast_block;
}

function outputError(result) 
{
    if(message != null){
        message.style.display = null;
        last_podcast = message;
    }
    else
    {
        message = document.getElementById("error");
        message.children[0].append(result.message);
        message.style.display = null;
        last_podcast = message;
    }
}