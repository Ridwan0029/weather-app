const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
// console.log(argv);
let encodedAddress = encodeURIComponent(argv.a)

request({
    // url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDtGl6QfpUIOyPP-uWLXEzOuOTJXg_h5UE&address=' + encodedAddress,
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDtGl6QfpUIOyPP-uWLXEzOuOTJXg_h5UE&address= ${encodedAddress}`,
    json: true
}, (error, response, body) => {
    if(error) {
        console.log('unable to connect to Google');
    } else if(body.status === 'ZERO_RESULTS') {
        console.log('unable to find address');
    } else if (body.status === 'OK') {
        // console.log(JSON.stringify(body, undefined, 2));
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
}) 