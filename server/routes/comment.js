let express = require('express')
let articlesArray = require('./articles')
let router = express.Router()

router.post('/:id/comment', (req, res, err) => {
	console.log(req.body)
	if (!req.body.comment || req.body.comment === null 
		|| !req.body.user || req.body.user === null) {
		console.error(err.status)
		let msg = 'Comment and username are required. Please fill them with values!'
		res.render('error', {
			title: 'Error new comment.',
			message: msg,
			error: err
		})
	} else {
		let addedComment = null
		for(let article of articlesArray) {
			if (req.params.id === article.id) {
				let commentObj = {
					text: req.body.comment,
					user: req.body.user,
					commentDate: new Date().toISOString()
				}
				addedComment = commentObj
				article.comments.push(commentObj)
			}
		}
		res.render('comment', {
			title: 'Create new Comment',
			comment: addedComment})
	}
})

module.exports = router