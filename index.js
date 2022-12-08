const express = require('express')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./api.yaml')
const fileUpload = require('express-fileupload')
const data = require('./public/restaurant.json')
const app = express()
app.use(express.json())
app.use(fileUpload())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))

// get restaurant list
app.get('/api/restaurants', (req, res) => {
  res.status(200).send(data.restaurants)
})

// get restaurant by id
app.get('/api/restaurant/:restaurantId', (req, res) => {
  const obj = data.restaurants.find(
    (x) => x.id === parseInt(req.params.restaurantId)
  )
  res.status(200).send(obj)
})

// create a new restaurant
app.post('/api/restaurants/new', (req, res) => {
  data.restaurants = [req.body, ...data.restaurants]
  res.status(200).send(data.restaurants)
})

// get restaurant by categoryId
app.get('/api/restaurants/categoryId', (req, res) => {
  let box = []
  data.restaurants.forEach((item) => {
    if (item.categoryId === parseInt(req.query.categoryId)) {
      box.push(item)
    }
  })
  res.status(200).send(box)
})

// check all categories
app.get('/api/admin/categories', (req, res) => {
  res.status(200).send(data.categories)
})

//  edit specific restaurant by its id
app.put('/api/restaurants/:restaurantId', (req, res) => {
  let restaurantData = data.restaurants
  const editData = (restaurantData = restaurantData[req.body.id] = req.body)
  res.status(200).send(editData)
})

// delete restaurant by its id
app.delete('/api/restaurants/:restaurantId', (req, res) => {
  let restaurantData = data.restaurants

  restaurantData.forEach((item, index) => {
    if (item['id'] === parseInt(req.params.restaurantId)) {
      restaurantData.splice(index, 1)
    }
  })

  res.status(200).send(restaurantData)
})

app.listen(4000, () => console.log('UP & Running'))
