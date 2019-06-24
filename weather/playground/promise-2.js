const request = require('request');

var url = 'http://www.mapquestapi.com/geocoding/v1/address';
var key = 'OG077COhPZGfBQO7wk342dV9vhlSQtFj';


var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);
        request({
            url: `${url}?key=${key}&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to servers');
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
        
                resolve(location);
            }
        });
    });
    
};


geocodeAddress('60532-500')
    .then(
        location => console.log(location),
        errorMessage => console.log(errorMessage)
    );
