const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDtGl6QfpUIOyPP-uWLXEzOuOTJXg_h5UE&address=20%20Hospital%20Roadd%20Ajegunle%20Osogbo',
    json: true
}, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
}) 