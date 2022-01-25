const express = require('express')
const mongoose = require('mongoose')
const app = express()
const parser = require('body-parser')
const path = require('path')

app.use(parser.json())
app.use(parser.urlencoded({extended:true}))
app.use(express.json())



mongoose.connect("mongodb://localhost:27017/foodEntries", {
    useNewURLParser:true
}).then(()=>{
    console.log("Connected to mungo's db")
}).catch((err)=>{
    console.log(err)
})

/*var Food = mongoose.model('Food', {typeOfFood:String})

var food = new Food({typeOfFood:"Blue Milk from Star Wars"})

food.save().then(()=>{
    console.log("Food Saved")
})*/

require('./models/Food')
var Food = mongoose.model('food')

app.post('/saveFoodEntry',(request, response)=>{
    console.log(request.body)
    //create new entry for food
    new Food(request.body).save().then(()=>{
        console.log("Data saved")
        response.redirect("foodList.html")
    })
})

//read the data
app.get('/getData', (req, res)=>{
    Food.find().then((food)=>{
        res.json({food})
    })
})

//delete the data
app.post('/deleteFood',(req, res)=>{
    console.log("Food Item Deleted" + req.body._id)
    Food.findByIdAndDelete(req.body._id).exec()
    res.redirect('foodList.html')
})

app.use(express.static(__dirname+"/views"))
app.listen(3000,()=>{
    console.log("Listening mungo 3000")
})