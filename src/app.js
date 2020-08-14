const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//variable to store our express application and configure our server

const app = express()
const port = process.env.PORT || 3000

//define paths for express
const publicPath = path.join(__dirname, '../public')

//to customize the name of the hbs files, create a path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//3 parameters for set  key: .setting name,and value
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//to use the partial path use hbs instead of app
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    //name of view (index) and an object to access
    res.render('index', {
        title: 'Weather App',
        name: 'Liana Kotzabasi'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Liana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'If you want help, please contact us ',
        title: "HELP",
        name: 'LIANA'
    })
})

//setting up a path for static directory
app.use(express.static(publicPath))

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })

})


//get response from server
//get method has two arguments: 1. route 2. funtion (what we want to show when someone visits this route - what to send back)
//the function has two arguments: 1. the object containing information about the request to server
//2. the response





/* DIRECTORIES:
app.com
app.com/help
app.com/about*/
//for everything else (error 404 use the wildcard *)
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'About is not found'
    })
})

app.get('/products/', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'LIANA',
        errorMessage: 'Help article is not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'LIANA',
        errorMessage: 'Page NOT Found'
    })
})

//to start the server:
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
}) //3000 is the port
