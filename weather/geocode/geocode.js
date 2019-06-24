const request = require('request');

// http://www.mapquestapi.com/geocoding/v1/address?key=OG077COhPZGfBQO7wk342dV9vhlSQtFj&location=1301%20lombard%20street%20philadelphia
var url = 'http://www.mapquestapi.com/geocoding/v1/address';
var key = 'OG077COhPZGfBQO7wk342dV9vhlSQtFj';


var geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);
    request({
        url: `${url}?key=${key}&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback(error);
        } else {
            let street = body.results[0].locations[0].street;
            let city = body.results[0].locations[0].adminArea5;
            let state = body.results[0].locations[0].adminArea3;
            let country = body.results[0].locations[0].adminArea1;
            let location = {
                address: `${street}, ${city}-${state}, ${country}`,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            };
    
            callback(error, location);
        }
    });
    
};


module.exports = {
    geocodeAddress
};