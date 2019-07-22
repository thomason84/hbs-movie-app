const movieList = document.getElementsByClassName('movie');
const movieArray = Array.from(movieList);

movieArray.map(function(index){
  index.addEventListener('click', function(){
    window.location.href = '/MovieDetail?movie=' + this.id;
  })
});
