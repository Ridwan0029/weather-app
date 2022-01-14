const request = require('request');

let getWeather = (lat, lon, callback) => {

    request({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d78d2c6e09dad38a743305e55d959e0b`,
        json: true
    }, (error, response, body)=>{
        // if (error){
        //     callback('unable to connect to OpenWeatherMap server');
        // } else if ( (response.statusCode === 400) || (response.statusCode === 401)){
        //     callback('Unable to fetch weather')
        // } else if( response.statusCode === 200 ) {
        //     callback( undefined, {
        //         temperature: body.main.temp,
        //         apparentTemperature: body.main.feels_like
        //     })
        // }
    
        if(error){
            callback('unable to connect to OpenWeatherMap server');
        }else if( !error && response.statusCode === 200 ){
            callback(undefined, {
                temperature: body.main.temp,
                apparentTemperature: body.main.feels_like
            });
        } else {
            callback('Unable to fetch Weather');
        }
    })

}

module.exports.getWeather = getWeather;