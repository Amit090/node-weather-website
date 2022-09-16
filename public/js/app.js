const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message-1')

weatherForm.addEventListener(('submit'),(e) => {
    e.preventDefault()
    const location = search.value
    message_1.textContent = '..loading'
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message_1.textContent = data.error
            }else{
            message_1.textContent = data.Forecast + ' in ' + data.Address
            }
        })
    })
})


