var path = require("path");
const fetch = require("node-fetch");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);
const baseURLgeonames = "http://api.geonames.org/search?";
const username = process.env.API_ID_geonames;

const baseURLweatherbit = "http://api.weatherbit.io/v2.0/forecast/daily?";
const Master_API_Key = process.env.API_ID_Weatherbit;

const baseURLpixabay = "https://pixabay.com/api/?";
const API_ID_pixabay = process.env.API_ID_pixabay;

const baseURL="https://restcountries.eu/rest/v2/name/"
console.log(`Your API Key is ${username}`);
console.log(`Your API Key is ${Master_API_Key}`);
console.log(`Your API Key is ${API_ID_pixabay}`);

let userInput = [];
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
app.post("/api", async function (req, res) {
  userInput = req.body.url;
  console.log(`You entered: ${userInput}`);
  const apiURL = `${baseURLgeonames}q=${userInput}&username=${username}&type=json&maxRows=1`;

  const response = await fetch(apiURL);
  const data = await response.json();
  console.log(data);
  res.send(data);
});
app.post("/weatherbit", async function (req, res) {
  userInput = req.body.url;
  userInput2 = req.body.con;

  console.log(`You entered: ${userInput}`);
  const apiURL = `${baseURLweatherbit}city=${userInput}&country=${userInput2}&key=70502f4043894ae2a4d356d60f671698`;

  const response = await fetch(apiURL);
  const data = await response.json();
  console.log(data);
  res.send(data);
});

app.post("/pixabay", async function (req, res) {
  userInput = req.body.url;
  console.log(`You entered: ${userInput}`);
  const apiURL = `${baseURLpixabay}q=${userInput}&key=${API_ID_pixabay}&image_type=photo&category=buildings`;

  const response = await fetch(apiURL);
  const data = await response.json();
  console.log(data);
  res.send(data);
});
app.post("/country", async function (req, res) {
    userInput = req.body.con;
    console.log(`You entered: ${userInput}`);
    const apiURL = `${baseURL}${userInput}`;
    console.log(apiURL);

    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    res.send(data);
  });
 

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
