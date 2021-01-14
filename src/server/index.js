var path = require('path')
const fetch = require('node-fetch');
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const  cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)
const baseURL = 'http://api.geonames.org/search?'
const username = process.env.username
console.log(`Your API Key is ${process.env.username}`);
let userInput = []
app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
   // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/api', async function(req, res) {
    userInput = req.body.url;
    console.log(`You entered: ${userInput}`);
    const apiURL = `${baseURL}q=${userInput}&username=${username}`

    const response = await fetch(apiURL)
    const data = await response.json()
    console.log(data)
    res.send(data)

})
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})