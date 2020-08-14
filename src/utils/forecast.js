// const url = 'http://api.weatherstack.com/current?access_key=6327f56c7bea69f9b01e94ef78b38ba0&query=37.983810,23.727539'

// request({ url: url, json: true }, (error, response) => {

//     if (error) {
//         console.log('Unable to connect to weather server')
//     } else if(response.body.error){
//            console.log('Unable to find the location. Please try again')
//     } else {
//         const temperature = response.body.current.temperature
//         const feelLike = response.body.current.feelslike
//         const description = response.body.current.weather_descriptions[0]

//         console.log(`the weather today is ${description}`)
//         console.log(`the temperature is ${temperature} degrees`)
//     }
// })
const request = require('postman-request')

const forecast = (latitude,longitude,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=6327f56c7bea69f9b01e94ef78b38ba0&query='+latitude+
    ','+longitude
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather server')
        }
        else if(response.body.error){
            callback('Unable to find location. Please try again')
        }
        else{
            callback(undefined,{
                temperature:response.body.current.temperature,
                feelLike:response.body.current.feelslike,
                description:response.body.current.weather_descriptions[0],
                humidity:response.body.current.humidity
            })
        }

    })
}








module.exports=forecast