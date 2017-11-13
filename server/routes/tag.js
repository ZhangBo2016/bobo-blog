const Tag = require('../controllers/tag')
// const middleware = require('../middlewares')

const router = require('koa-router')()

router.prefix('/tag')

router.get('/list', Tag.list)

router.post('/create', Tag.create)

module.exports = router
