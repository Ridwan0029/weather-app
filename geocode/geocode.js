const request = require('request');

let geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address)

    request({
        // url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDtGl6QfpUIOyPP-uWLXEzOuOTJXg_h5UE&address=' + encodedAddress,
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1Ijoicmlkd2FuLWsiLCJhIjoiY2xiM2NnczUyMGFjejNwb3VyYzVnNjh4ayJ9.0fd-GY-DuQS2wT26VL_k-Q`,
        json: true
    }, (error, response, body) => {
        // if(error) {
        //     callback('unable to connect to Google Servers');
        // } else if(body.status === 'ZERO_RESULTS') {
        //     callback('unable to find address');
        // } 
        console.log(JSON.stringify(response.statusCode, undefined, 2));
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                // console.log(JSON.stringify(body, undefined, 2));
                address: body.features[0].place_name,
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0]
            });
        } else {
            callback('Unable to geocode');
        }
    }) 
}

module.exports = {
    geocodeAddress
}