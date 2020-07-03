async function start(){
    const vision = require('@google-cloud/vision');

  // Creates a client
  const client =  new vision.ImageAnnotatorClient({
      keyFilename: 'visionApi.json'
  });

  // Performs label detection on the image file
  const [result] =await client.labelDetection('still-image.jpg');
  const labels = result.labelAnnotations;
//   console.log('Labels:');
 //labels.forEach(label => console.log(label.description));
//   document.getElementById('AnsTxt').innerHTML="答案"+labels[1].description;
    //console.log(labels[1].description);
    console.log(labels);
    return labels[0].description;
}
start().catch(console.error);
//console.log(start())
module.exports ={
    start
}
