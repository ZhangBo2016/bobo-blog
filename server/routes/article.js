const Article = require('../controllers/article')
const middleware = require('../middlewares')

const router = require('koa-router')()

router.prefix('/article')

router.post('/modify/:id', middleware.verifyToken, Article.modify)

router.post('/save', middleware.verifyToken, Article.create)

router.get('/list', Article.list)

router.get('/detail/:id', Article.get)

module.exports = router
