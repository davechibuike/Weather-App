//jshint esversion:6

const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res)=>{
  const query = req.body.cityName;
  //register on open weather api , then insert your apiKey.. For example apiKey = "50387a778c5de1c4c5408e771915432"
  const apiKey = "";
  const unit = "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit +"";

  https.get(url, (responce)=>{
    console.log(responce.statusCode);

    responce.on("data", (data)=>{
      const weatherData = JSON.parse(data);
      const weatherTemp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";

      res.write("<p>The weather Description is " + weatherDescription + "</p>");
      res.write("<h2>The Weather Temprature in "+ query +" is "+ weatherTemp + " Degree's fahrenheit</h2>");
      res.write("<img src="+iconUrl+">");
      res.send();
    });
  });

});


app.listen(3000, ()=>{
  console.log("server is woring at port 3000");
});
