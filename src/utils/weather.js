const request = require('request');

let getWeather = (latitude, longitude, callback) => {

    request({
        url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${latitude},${longitude}&units=f`,
        json: true
    }, (error, response, body)=>{
        if(error){
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. The temperature is currently ' + response.body.current.temperature + ' degress fahrenheit.')
        }
    })
}

module.exports.getWeather = getWeather;