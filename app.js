const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("This is working");
});

app.post("/", function(req, res){
    const location = req.body.cityname;
    const units = "metric";
    const apiKey = "c0401ec8b30eb7cc114be10d62591407";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location +"&units="+ units +"&appid="+ apiKey;
    https.get(url, function (response) {
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const weatherTemp = Math.floor(Number(weatherData.main.temp));
            const weatherDescription = weatherData.weather[0].description
            const emoji = weatherData.weather[0].icon
            const weatherImage = "http://openweathermap.org/img/wn/"+ emoji +"@2x.png"
            res.write("<h1>The Temperature in "+ location +" is " + weatherTemp + " Celcius</h1>");
            res.write("<h1>The Weather in "+ location +" is like " + weatherDescription + "</h1>");
            res.write("<img src=" + weatherImage + ">");
            res.send();
        });
    });
});



