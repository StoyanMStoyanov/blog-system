let express = require('express')
let articlesArray = require('./articles')
let router = express.Router()
itemArticle = ''
let uuid = require('node-uuid')
let multer = require('multer')

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/')
	},
	filename: (req, file, cb) => {
		let n = file.mimetype.lastIndexOf('/')
		let extension = file.mimetype.substring(n + 1)
		itemArticle = uuid.v4() + '.' + extension
		cb(null, itemArticle)
	}
})

let upload = multer({storage: storage})

router.get('/', (req, res) => {
	res.render('create', {title: 'Create Article'})
})

router.post('/', upload.single('image'), (req, res, err) => {
	console.log(req.body)

	if (!req.body.title || req.body.title === null ||
		 	!req.body.description || req.body.description === null
	) {
		let msg = 'Title and description input are required. Please fill them with values!'
		res.render('create', {
			title: 'Create Article',
			globalError: msg
		})
	} else {
		let articleObj = {
			id: uuid.v4(),
			title: req.body.title,
			description: req.body.description,
			image: itemArticle,
			state: true,
			date: new Date().toISOString(),
			views: 0,
			comment: []
		}
		articlesArray.push(articleObj)
		res.redirect('/arcticle/all')
	}

})

module.exports = router