const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + 
    '.json?access_token=pk.eyJ1IjoibC1rb3R6YWJhc2kiLCJhIjoiY2tjd20za2ZvMGY5ejMycHFqaHA4ZDFxbCJ9.kr1yxdlEuJDoBH06O3HqqA&'
    request({url:url,json:true},(error,response)=>{

        if(error){
            //instead of loging up the error, pass it to callback. callback will decide what to do. one argument instead
            //of two (the second will be undefined)
            callback('Unable to connect to loacation services')
           }else if(response.body.features.length===0){
            callback('Unable to find location. Try again')
           }
           else{
               callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
               })
           }
    })

    // encodeURIComponent(address) instead of addres in url in order for special chars. otherwise app does not 
    // accept special characters

}
module.exports=geocode


