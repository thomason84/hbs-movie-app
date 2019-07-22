const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const fetch = require('node-fetch');
require('dotenv').config();

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("unable to append to server.log.");
    }
  });
  next();
});

app.use("/static", express.static("static"));
app.use("/files", express.static("files"));

app.use("/images", express.static("images"));

app.use(express.static(__dirname + "/public"));

let movies = [];
let movie = {};
const apiKey = process.env.API_KEY;

app.get("/", (req, res) => {
  const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey;

  return fetch(url)
  .then(
      function(response) {
          return response.json();
      }
  )
  .then(
    function(json){
       movies = json.results;

       res.render("CurrentlyPlaying.hbs", {
         data: movies,
         title: 'Movies currently playing in theaters',
         description: 'A complete list of all movies playing in theaters.  See what movies are now playing ,as well as, read a short synopsis and review information for each title.'
       })
    }
  )
});

app.get("/MovieDetail", (req, res) => {
  let movieId = req.query.movie;

  const url = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey + "&append_to_response=videos";

  return fetch(url)
  .then(
      function(response) {
        return response.json();
      }
  )
  .then(
    function(json){
      movie = json;
      // console.log(json)
      console.log("this is the movie object " + movie);

      res.render("MovieDetail.hbs", {
        movie: movie,
        title: 'Details for ' + movie.title,
        description: movie.overview
      })
    }
  );


});

app.listen(port, () => {
  console.log(`Sever is up on port ${port}`);
});
