let express = require('express')
let articlesArray = require('./articles')
let router = express.Router()

router.get('/', (req, res) => {
	articlesArray.sort((a, b) => {
		let dateA = new Date(a.date)
		let dateB = new Date(b.date)
		return dateA - dateB
	})
	let articles = []
	for(let article of articlesArray) {
		if(article.state === true) {
			articles.push(article)
		}
	}
	//console.log(articles)
	res.render('articles-all', {title: 'All articles', articles: articles})
})

module.exports = router