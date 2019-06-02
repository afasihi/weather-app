const weatherForm = document.querySelector('form')
const searchForm = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchForm.value;
    msgOne.textContent = "Loading...";
    msgTwo.textContent = "";
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error;
            } else {
                msgOne.textContent = data.address;
                msgTwo.textContent = data.forecastData.result + " and " + data.forecastData.description;
                
            }

        })
    })
})