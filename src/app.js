const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('../utils/forecast');
const geoCode = require('../utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//setup static directory to serve
app.use(express.static(publicDirPath));

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'abderrahman fasihi'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Abderrahman fasihi'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'if you need help don\'t contact us',
        title: 'Help',
        name: "Abderrahman fasihi"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "please provide a valid address"
        })
    }
    geoCode(req.query.address, (error, { lon, lat, name} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(lon, lat, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                data: forecastData,
                name,
                address: req.query.address
            })
        });
    });
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help artical not found',
        name: "Abderrahman fasihi"
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        message: 'Page not found',
        name: "Abderrahman fasihi"
    })
})

app.listen(port, () => {
    console.log(`server started at port ${port}`);
})