// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// var Omx = require('node-omxplayer');
// Creates a client
var player = require('play-sound')(opts = {})
const client = new textToSpeech.TextToSpeechClient({
    keyFilename: 'rasberry-20200203-hw-t1-smjjay-7d8b5bc0c204.json'
});
async function quickStart() {
    // The text to synthesize
    const text = '香蕉是什麼';

    // Construct the request
    const request = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'zh-TW', ssmlGender: 'FEMALE' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');

}
// quickStart();
// player.play('output.mp3', function(err) {
//     if (err) throw err
// })

quickStart().catch(console.error);

module.exports = {
    quickStart
}