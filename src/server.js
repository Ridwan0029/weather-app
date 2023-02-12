require('dotenv').config({path: __dirname + '/../.env'})
const yargs = require('yargs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

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
if (!argv.a) {
    console.log('Please provide an address')  //this line may not execute since line 8 above already ensures the user passes an address argument.
} else {
    geocode.geocodeAddress(argv.a, (error, results)=> {
        if (error){
            return console.log(error);
        } 
        
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults)=> {
            if (errorMessage){
                return console.log(errorMessage);
            } else {
                console.log(results.location);
                console.log(weatherResults)
            }
        });
    });

    // Alternatively, the above codes can be written as follows:

    // geocode.geocodeAddress(argv.a, (error, { latitude, longitude, location } = {}) => {
    //     if (error) {
    //         return console.log(error)
    //     }

    //     weather.getWeather(latitude, longitude, (error, forecastData) => {
    //         if (error) {
    //             return console.log(error);
    //         }

    //         console.log(location)
    //         console.log(forecastData)
    //     })
    // })
}