let express = require('express')
let articlesArray = require('./articles')
let router = express.Router()

router.get('/:id', (req, res) => {
	let item = null
	console.log(req.param.id)
	for(let article of articlesArray) {
		if (req.params.id === article.id) {
			article.views = article.views + 1
			item = article
		}
	}
	console.log(item.id)
	res.render('article-details', {title: 'Article details.', item: item})
})
module.exports = router