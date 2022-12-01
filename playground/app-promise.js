const yargs = require('yargs');
const axios = require('axios');

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

    let encodedAddress = encodeURIComponent(argv.address);
    let geocoderUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDtGl6QfpUIOyPP-uWLXEzOuOTJXg_h5UE&address= ${encodedAddress}`

    axios.get(geocoderUrl).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that location. Could be invalid location address/ zip code')
        }
        else if (response.data.status === 'REQUEST_DENIED') {
            throw new Error('For geocode, ' + response.data.error_message )
        }

        let lat = response.data.results[0].geometry.location.lat;
        let lon = response.data.results[0].geometry.location.lng;
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d78d2c6e09dad38a743305e55d959e0b`;
        // console.log(JSON.stringify(response.data, undefined, 2));
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }).then((response)=>{
        // console.log(response.data)
        let temperature = response.data.main.temp;
        let apparentTemperature = response.data.main.feels_like;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
    }).catch((e) => {
        // console.log(e.code)

        // console.log(e.response)

        // console.log(e.response.data);

        if(e.code && e.code === 'ENOTFOUND'){
            console.log('Unable to connect to Geocode or Weather API servers.');
        }
        else if(e.response && e.response.status === 404){
            console.log('invalid geocoderUrl or weatherUrl')
        }
        else if((e.response && e.response.data.cod === '400') || (e.response && e.response.data.cod === 401) ) {
            console.log('Unable to fetch weather.. ' + e.response.data.message );
        }
        else{
            console.log(e.message);
        }


        // if (error.response) {
        //     // The request was made and the server responded with a status code
        //     // that falls out of the range of 2xx
        //     console.log('################################################');
        //     console.log('error.response.data:      ',error.response.data);
        //     console.log('################################################')
        //     console.log('error.response.status:  ',error.response.status);
        //     console.log('################################################')
        //     console.log('error.response.headers:  ',error.response.headers);
        //   } else if (error.request) {
        //     // The request was made but no response was received
        //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //     // http.ClientRequest in node.js
        //     console.log('################################################')
        //     console.log('error.request:  ',error.request);
        //   } else {
        //     // Something happened in setting up the request that triggered an Error
        //     console.log('################################################')
        //     console.log('throw Error:   ', error.message);
        //   }
        //   console.log('################################################')
        //   console.log('error.config:  ',error.config);

        
    });