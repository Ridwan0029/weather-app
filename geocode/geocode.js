const request = require('request');

let geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address)

    request({
        // url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDtGl6QfpUIOyPP-uWLXEzOuOTJXg_h5UE&address=' + encodedAddress,
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDtGl6QfpUIOyPP-uWLXEzOuOTJXg_h5UE&address= ${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        // if(error) {
        //     callback('unable to connect to Google Servers');
        // } else if(body.status === 'ZERO_RESULTS') {
        //     callback('unable to find address');
        // } 
        if (!error && body.status === 'OK') {
            callback(undefined, {
                // console.log(JSON.stringify(body, undefined, 2));
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        } else {
            callback('Unable to geocode');
        }
    }) 
}

module.exports = {
    geocodeAddress
}