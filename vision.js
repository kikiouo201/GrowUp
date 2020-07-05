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
    const labels = result.labelAnnotations;
    const text = labels[0].description;
    const target = "zh-TW"
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:'+translations);
    return translations
    
}
start().catch(console.error);
//console.log(start())
module.exports ={
    start
}
