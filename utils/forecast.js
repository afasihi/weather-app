const request = require('request')

const forecast = (lon, lat, callback) => {
    let urlWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=dec44e6d6f6473963eeff465cbee3b64&units=metric`
    request({ url: urlWeather, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("You are not connect, please connect again");
        } else if (!(body.name)) {
            callback("coordenate in incorrect, try another search");
        }
        else {
            let { name, main } = body;
            let { temp, humidity } = main;
            //callback(undefined ,`${name} it\'s currently ${Math.trunc(temp)} C. there is ${humidity}% of humidity.`);
            callback(undefined, {
                name,
                temp: Math.trunc(temp),
                humidity,
                result:`${name} it\'s currently ${Math.trunc(temp)} C. there is ${humidity}% of humidity.`
            })
        }
    })
};

module.exports = forecast;