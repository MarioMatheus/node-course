const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            describe: 'Address to fetch weather for',
            demand: true,
            alias: 'address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


geocode.geocodeAddress(argv.address, (error, location) => {
    if (error) {
        console.log('An error occurred, unable to connect to servers', error);
    } else {
        console.log(' * ', location.address);
        weather.getWeather(location.latitude, location.longitude, (error, weather) => {
            let message = error ? 'Unable to fetch weather' : `The weather is ${weather.summary} with ${weather.temperature}${'\u2109'}`;
            console.log(' * ', message);
        });
    }
});
