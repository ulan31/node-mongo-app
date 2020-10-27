const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const path = require('path')

const PORT = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine) /*зарегистрировал движок*/
app.set('view engine', 'hbs') /*используем в приложении*/
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
  try{
    await mongoose.connect('mongodb+srv://ulan:lexuslx570@cluster0.76wpt.mongodb.net/todos', {
      newUserUrlParser: true,
      useFindAndModify: false
    })
    app.listen(PORT, () => {
      console.log('Serve has been started...')
    })
  } catch(e) {
    console.log(e)
  }
}

start()