const request = require('request');

let getWeather = (latitude, longitude, callback) => {

    request({
        url: `http://api.weatherstack.com/current?access_key=3d00e235aacebe22f08418537380ea81&query=${latitude},${longitude}&units=f`,
        json: true
    }, (error, response, body)=>{
        if(error){
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + ' % chance of rain.')
        }
    })
}

module.exports.getWeather = getWeather;