let songsrc = (new URLSearchParams(location.search)).get("src");


function onload(){
  let song_src = document.getElementById("song")
  if(songsrc!=null){
    song_src.src = songsrc
  }
  
}