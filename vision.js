const Translate = require('@google-cloud/translate').v2;

const translate = new Translate.Translate({
    keyFilename: 'ApiKey.json'
});

async function start(){
    const vision = require('@google-cloud/vision');

  // Creates a client
  const client =  new vision.ImageAnnotatorClient({
      keyFilename: 'ApiKey.json'
  });

  // Performs label detection on the image file
    const [result] =await client.labelDetection('still-image.jpg');
    var labels = result.labelAnnotations;
    console.log(labels)
    let text = ""; 
    
    for(var i=0;i<labels.length;i++){
        if(labels[i].description.toString() == "Watermelon"){
            text = labels[i].description;
        }
        
        if(labels[i].description.toString() == "Apple"){
            text = labels[i].description;
        }

        if(labels[i].description.toString() == "Banana"){
            text = labels[i].description;
        }

        if(labels[i].description.toString() == "Laptop"){
            text = labels[i].description;
        }

        if(labels[i].description.toString() == "Pen"){
            text = labels[i].description;
        }
        else{
            text = labels[0].description;
        }
    }
    
    const target = "zh-TW"
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    return translations

    
}
start().catch(console.error);
//console.log(start())
module.exports ={
    start
}
