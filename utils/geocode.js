const request = require('request')

const geoCode = (address, callback) => {
    //replace special characters use encodeURIComponent(address)
    let urlLocation = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWZhc2loaSIsImEiOiJjanZzN2xrcXUwOGNoNGJwbWozbDhzanRpIn0.4rGAVUSJYBWjM3dmwclZKA&limit=1`

    request({ url: urlLocation, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("the service is not working, please check network connection");
        } else if (body.features.length === 0) {
            callback("Unable to find location, please insert valid location");
        } else {
            let { center, place_name: name } = body.features[0];
            let { [0]: lon, [1]: lat } = center;
            callback(undefined, {
                lat,
                lon,
                name,
                result: `latitude is ${lat} and longitude is ${lon} in ${name}`
            });
        }
    })
};
module.exports = geoCode;