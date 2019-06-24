const yargs = require('yargs');
const axios = require('axios');

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


const mapQuestUrl = 'http://www.mapquestapi.com/geocoding/v1/address?key=OG077COhPZGfBQO7wk342dV9vhlSQtFj&location';
const darkskyUrl = 'https://api.darksky.net/forecast/e46775e83395c30101be049ddd915455';

axios.get(`${mapQuestUrl}=${encodeURIComponent(argv.address)}`)
    .then(response => {
        let location = response.data.results[0].locations[0];
        console.log(' *', `${location.street}, ${location.adminArea5}-${location.adminArea3}, ${location.adminArea1}`);
        return axios.get(`${darkskyUrl}/${location.latLng.lat},${location.latLng.lng}`);
    })
    .then(response => {
        let summary = response.data.currently.summary;
        let temperature = response.data.currently.temperature;
        console.log(` * The weather is ${summary} with ${temperature}${'\u2109'}`);
    })
    .catch(e => console.log(e));
