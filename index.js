// imports
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const request = require('request');
const { response } = require('express');



// init
const app = express();

// create viewPath variable
const viewsPath = path.join(__dirname, './views');

//  declare the path to partialPath
const partialPath = path.join(__dirname, './views/inc');

// init partial path
hbs.registerPartials(partialPath);

//setting sets and use
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.urlencoded());
app.use(express.json());


// routes

// targeting the api url 
app.get("/", (req, res) => {
  const jokeURL = "https://api.chucknorris.io/jokes/random"
  
    // setting the request, setting json = true and error handling
  request( { url: jokeURL, json: true }, (error, response) => {
    if (response.body.error) {
        res.render('index',  {
            joke: "Sorry that joke does not exist"
        })
    } else {  
        res.render('index', {
            joke: response.body.value
        })
    }
  }); 

});



// server port
app.listen(5000, () => {
    console.log("server running @port 5000")
});