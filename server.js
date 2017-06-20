let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')

let app = express()
let port = process.env.port || 4000
let env = process.env.MODE_ENV || 'development'

let routes = require('./server/routes/index')
let create = require('./server/routes/create')
let allArticles = require('./server/routes/get-all-articles')
let articleDetails = require('./server/routes/article-details')
let comment = require('./server/routes/comment')
let stats = require('./server/routes/stats')

//view enjine setup
app.set('views', path.join(__dirname, 'server/views'))
app.set('view engine', 'pug')
app.set('result', [])

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/arcticle/create', create)
app.use('/arcticle/all', allArticles)
app.use('/article/details', articleDetails)
app.use('/article/details/', comment)
app.use('/article/stats', stats)

app.listen(port, routes, (routes) => {
	console.log(`Express running on port ${port}`)
})