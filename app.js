const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

const bodyParser = require('body-parser')

// express middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

const cors = require('cors')
app.use(cors())

mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log('Connected to DB')
)

app.get('/', (req, res) => res.status(200).send(JSON.stringify('Welcome to our Catering Server!')))

const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute)
//hello
const user2Route = require('./routes/user2')
app.use('/user2', user2Route)

const newsletterRoute = require('./routes/newsletter')
app.use('/newsletter', newsletterRoute)

const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

const restaurantRoute = require('./routes/restaurants')
app.use('/restaurant', restaurantRoute)

const categoryRoute = require('./routes/category')
app.use('/category', categoryRoute)

const ordersRoute = require('./routes/orders')
app.use('/orders', ordersRoute)

const customersRoute = require('./routes/customers')
app.use('/customers', customersRoute)

const caterersRoute = require('./routes/caterers')
app.use('/caterers', caterersRoute)

const cartsRoute = require('./routes/carts')
app.use('/carts', cartsRoute)

const checkoutsRoute = require('./routes/checkouts')
app.use('/checkouts', checkoutsRoute)

const foodsRoute = require('./routes/foods')
app.use('/foods', foodsRoute)

const menusRoute = require('./routes/menus')
app.use('/menus', menusRoute)

const usersRoute = require('./routes/users')
app.use('/users', usersRoute)

app.listen(process.env.PORT)
module.exports = app
