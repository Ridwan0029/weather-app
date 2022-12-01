const request = require('request')

const geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodedAddress + '.json?access_token=pk.eyJ1Ijoicmlkd2FuLWsiLCJhIjoiY2xiM2NnczUyMGFjejNwb3VyYzVnNjh4ayJ9.0fd-GY-DuQS2wT26VL_k-Q'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocodeAddress
}