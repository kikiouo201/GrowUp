const request = require('request')
const cheerio = require('cheerio')
const encoding = require('encoding');
const iconv = require('iconv-lite');






async function webcrawler() {
  const url = 'https://www.moedict.tw/%E8%A5%BF%E7%93%9C#gsc.tab=0'
  let output;
  console.log(url)
  const yo=await request(url, (err, res, body) => {
    return new Promise((resolve,reject)=>{
    if(!err && res.statusCode == 200){
       const $ = cheerio.load(body);
       let def = $('.def')
       output = def.find('a').text() 
    }
    //console.log(output);
      resolve(output);
      console.log(output);
    });
  })
 console.log(yo);
  
}

module.exports ={
  webcrawler
}

