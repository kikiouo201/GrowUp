const request = require('request')
const cheerio = require('cheerio')






function webcrawler(data) {
  const url = 'https://www.moedict.tw/'+data+'#gsc.tab=0'
  console.log(url)
  request(url, (err, res, body) => {
    if(!err && res.statusCode == 200){
       const $ = cheerio.load(body);
       const def = $('.def');
       const output = def.find('a').text();
       console.log(output)
    }
  })
}
webcrawler()

module.exports ={
  webcrawler
}