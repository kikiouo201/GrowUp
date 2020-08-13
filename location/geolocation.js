function geolocation(callback){
  var geolocation = require ('google-geolocation') ({
    key: 'AIzaSyD_YwIB4PqQN9xd4f_A-iJY4lr98VBhFHE'
  });
  var piWifi = require('pi-wifi');

  piWifi.scan(function(err, networks) {
    if (err) {
      return console.error(err.message);
    }
    //console.log(networks);

    var items=[];
    for(i in networks){
      items.push({
        'macAddress': networks[i].bssid,
        'signalStrength': networks[i].signalLevel,
      });
    }

    var params={
      wifiAccessPoints: items,
    };

    geolocation (params, (err, data) => {
      if (err) {
        return;
      }

      var result={
        'lat': data.location.lat,
        'lng': data.location.lng,
        'accuracy': data.accuracy,
        'type': 'wifi',
      };

      if(callback &&  typeof(callback) == "function")
        callback(result);
    });
  });
}

geolocation(function(location){
  console.log(location);
  var url ="https://www.google.com.tw/maps/search/"+location.lat+","+location.lng;
  console.log(url);
});