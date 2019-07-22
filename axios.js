const axios = require('axios');

const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=a611315ba9b178c672528a504436308c"

axios.get(url)
.then(
    function(response) {
        console.log(response)
    }
)