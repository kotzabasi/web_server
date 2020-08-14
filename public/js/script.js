
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
messageOne = document.querySelector('#message-1')
messageTwo = document.querySelector('#message-2')





var place = weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent= ''

    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
            }
            else{
                messageTwo.innerHTML = data.location+" "+ "<br>"+"Temperature: "+data.forecast.temperature+
                "<br>"+"Description: "+data.forecast.description+"<br>"+"Feels Like: "+data.forecast.feelLike+"<br>"+
                "Humidity: "+data.forecast.humidity
                // console.log(data.forecast)
            }
        })
    })
   

    
})



  
   