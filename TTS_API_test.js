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
async function quickStart(type, num, kword, click_num) {

    const request = {
        input: { text: kword },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'zh-TW', ssmlGender: 'FEMALE' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);

    if (type == 'pre') {
        await writeFile(`./TTS/mp3/STTpictureBook/${click_num}${type}_${num}.mp3`, response.audioContent, 'binary');
        console.log(`Audio content written to file: ${click_num}${type}_${num}.mp3`);
        let TTS = `${click_num}${type}_${num}`;
        return TTS;
    } else if (type == 'crawler') {
        await writeFile(`./TTS/mp3/STTpictureBook/${click_num}${type}_${num}.mp3`, response.audioContent, 'binary');
        console.log(`Audio content written to file: ${click_num}${type}_${num}.mp3`);
        let TTS = `${click_num}${type}_${num}`;
        return TTS;
    } else {
        await writeFile(`./TTS/mp3/STTpictureBook/${click_num}${type}_${num}.mp3`, response.audioContent, 'binary');
        console.log(`Audio content written to file: ${click_num}${type}_${num}.mp3`);
        let TTS = `${click_num}${type}_${num}`;
        return TTS;

    }

}

function randomid(imgLength) {
    let picName = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length;
    for (let i = 0; i < imgLength; i += 1) {
        picName += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log("picName:" + picName)
    return picName;
}


// quickStart();
// player.play('output.mp3', function(err) {
//     if (err) throw err
// })

quickStart().catch(console.error);

module.exports = {
    quickStart
}