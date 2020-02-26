const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config')
const fetch = require('node-fetch');
global.fetch = fetch
global.Headers = fetch.Headers;
const request = require('request');

//MiddleWares
app.use(cors());
app.use(bodyParser.json());


//Import routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

// mongodb+srv://andreea:<password>@cluster0-vcgpe.mongodb.net/test?retryWrites=true&w=majority
// andreea  -> username
// bdE6kMcJ46XgbZ6a  -> passward

mongoose.connect(process.env.DB_CONNECTION, { // RestAPI_yourtube este numele bazei de date

        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB connected... ');
    });


//Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

app.get('/posts', (req, res) => {
    res.send('We are on posts');
});



app.get('/numbers', async(req, res) => {
    const options = {
        headers: {
            'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
            'x-rapidapi-key': '12558e4519mshf618e9530703c35p1f8b68jsn548ff580d8a7'
        }
    };

    const api1_url = 'https://numbersapi.p.rapidapi.com/6/21/date?fragment=true&json=true';
    const fetch_response = await fetch(api1_url, options);
    const json = await fetch_response.json();
    res.json(json);
});


app.get('/calculator', async(req, res) => {
    const options2 = {
        headers: {
            'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
            'x-rapidapi-key': '12558e4519mshf618e9530703c35p1f8b68jsn548ff580d8a7'
        }
    };

    const api2_url = 'https://love-calculator.p.rapidapi.com/getPercentage?fname=Joe&sname=Alice';
    const fetch_response = await fetch(api2_url, options2);
    const json = await fetch_response.json();
    res.json(json);
});


app.get('/ChuckNorris', async(req, res) => {
    const options3 = {
        headers: {
            'x-rapidapi-host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
            'x-rapidapi-key': '12558e4519mshf618e9530703c35p1f8b68jsn548ff580d8a7',
            'accept': 'application/json'
        }
    };

    const api3_url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';
    const fetch_response = await fetch(api3_url, options3);
    const json = await fetch_response.json();
    res.json(json);
});


//How to we start to listening to the server
app.listen(3000); // 3000 este portul