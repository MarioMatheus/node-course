const request = require('request');

var urlApi = 'https://api.darksky.net/forecast';
var key = 'e46775e83395c30101be049ddd915455';


var getWeather = (latitude, longitude, callback) => {
    request({
        url: `${urlApi}/${key}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback(error);
        } else {
            let weather = {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                humidity: body.currently.humidity
            }
            callback(error, weather);
        }
    });
};


module.exports = {
    getWeather
}