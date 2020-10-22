let songsrc = (new URLSearchParams(location.search)).get("src");
let songsrc = (new URLSearchParams(location.search)).get("id");


function onload(){
  let song_src = document.getElementById("song")
  if(songsrc!=null){
    song_src.src = songsrc
  }
  
}