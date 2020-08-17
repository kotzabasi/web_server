
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

messageOne = document.querySelector('#message-1')
messageTwo = document.querySelector('#message-2')

var place = weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else {
                messageTwo.innerHTML = data.location + " " + "<br>" + "Temperature: " + data.forecast.temperature +
                    "<br>" + "Description: " + data.forecast.description + "<br>" + "Feels Like: " + data.forecast.feelLike + "<br>" +
                    "Humidity: " + data.forecast.humidity
            }
            var description = data.forecast.description.toLowerCase()
            if (description.includes('clear')) {
                document.querySelector('.main').style.backgroundImage = 'url(../img/clear.jpg)'
                document.getElementById('link1').style.color = 'white'
                document.getElementById('link2').style.color = 'white'
                document.getElementById('link3').style.color = 'white'
            }
            else if (description.includes('sunny')) {
                document.querySelector('.main').style.backgroundImage = 'url(../img/sunny.jpg)'
                document.getElementById('link1').style.color = '#2C3539'
                document.getElementById('link2').style.color = '#2C3539'
                document.getElementById('link3').style.color = '#2C3539'
            }
            else if (description.includes('cloudy') || description.includes('overcast')) {
                document.querySelector('.main').style.backgroundImage = 'url(../img/cloudy.jpg)'
                document.getElementById('link1').style.color = 'blue'
                document.getElementById('link2').style.color = 'blue'
                document.getElementById('link3').style.color = 'blue'
            }

            else if (description.includes('shower')) {
                document.querySelector('.main').style.backgroundImage = 'url(../img/shower.jpg)'
                document.getElementById('link1').style.color = 'white'
                document.getElementById('link2').style.color = 'white'
                document.getElementById('link3').style.color = 'white'
            }
            else if (description.includes('rain')) {
                document.querySelector('.main').style.backgroundImage = 'url(../img/rain.jpg)'
                document.getElementById('link1').style.color = 'white'
                document.getElementById('link2').style.color = 'white'
                document.getElementById('link3').style.color = 'white'
            }
            else if (description.includes('mist') || description.includes('haze') || description.includes('fog') ) {
                document.querySelector('.main').style.backgroundImage = 'url(../img/mist.jpg)'
                document.getElementById('link1').style.color = 'white'
                document.getElementById('link2').style.color = 'white'
                document.getElementById('link3').style.color = 'white'
            }
            else if (description.includes('snow') || description.includes('sleet')){
                document.querySelector('.main').style.backgroundImage = 'url(../img/snow.jpg)'
                document.getElementById('link1').style.color = 'white'
                document.getElementById('link2').style.color = 'white'
                document.getElementById('link3').style.color = 'white'
            }
            else {
                document.querySelector('.main').style.backgroundImage = 'url(../img/bluesky.jpg)'
            }
        })
    })
})



