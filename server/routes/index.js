let express = require('express')
let articlesArray = require('./articles')
let router = express.Router()

// Get Home page

router.get('/', (req, res) => {
	articlesArray.sort((a, b) => {
		let viewA = a.views
		let viewB = b.views
		return viewB - viewA
	})
	res.render('index', {title: 'Blog system.', articles: articlesArray})
})

module.exports = router
