const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const forecast = require('../src/utils/forecast')
const request = require('postman-request')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join('__dirname','../templates/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Amit'
    })
})

app.get('/weather',(req, res) => {
if(!req.query.address){
    // res.render('index',{
    //     title: 'Weather',
    //     name: 'Amit'
    // })
    res.send({
        error: 'Please provide a address'
    })
}
    forecast(-75.7088, 44.1545, (error, data) => {
        // console.log('Error', error)
        // console.log('Data', data)
        if(error!='undefined'){
            res.send({
                error: 'Unable to connect to server'
            })
        }else{
            res.send({
                Forecast: data,
                Address: req.query.address
            })
        }
      })
    
})


app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Amit'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Amit'
    })
})


// app.use(express.)
// app.get('/help',(req, res) => {
//     res.send('Welcome to help page')
// })
// app.get('/about',(req, res)=>{
//     res.send([{
//         name:'Amit',
//         age: 25
//     },{
//         name:'sumit',
//         age:'24'
//     }])
// })
app.get('/weather',(req, res) => {
    res.send('Welcome to Weather page')
})

app.get(('*'),(req, res) => {
    res.send('404 Not Found')
})
app.listen(3000,() => {
    console.log('server is running on port 3000')
})