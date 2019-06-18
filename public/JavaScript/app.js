const weatherForm = document.querySelector('form')
const searchForm = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchForm.value;
    msgOne.textContent = "Loading...";
    document.getElementById("temp").innerHTML = ""
    msgTwo.textContent = "";

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error;
            } else {
                msgOne.textContent = data.name;
                msgTwo.textContent = data.forecastData.description;
                document.getElementById("temp").innerHTML = data.forecastData.temp + "°c";
            }

        })
    })
})