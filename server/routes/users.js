const User = require('../controllers/user')

const router = require('koa-router')()

router.prefix('/user')

router.post('/register', User.registe)

router.post('/login', User.login)

module.exports = router
