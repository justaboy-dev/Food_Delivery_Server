const router = require("express-promise-router")()
const UserController = require('../controller/User')
const { validateBody, schemas } = require('../helpers/routerHelpers')

router.route('/signup').post(UserController.signUp)
router.route('/signin').post(UserController.signIn)

module.exports = router 