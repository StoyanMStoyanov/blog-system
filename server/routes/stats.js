let express = require('express')
let articlesArray = require('./articles')
let router = express.Router()

router.get('/', (req, res, err) => {
	if (req.get('My-Authorization') === 'Admin') {
		let articles = []
		let commentsCount = 0
		let viewsCount = 0
		for(let article of articlesArray) {
			articles.push(article.title)
			commentsCount += article.comments.length
			viewsCount += article.views
		}
		res.send('All articles titles: ' + articles + '\nTotal Count of Comments: ' + commentsCount + '\nTotal Count of Views: ' + viewsCount)
	} else {
		res.status(404)
		let msg = 'Invalid request header!'
		res.render('error', {
			message: msg,
			error: err
		})
	}
})

module.exports = router
