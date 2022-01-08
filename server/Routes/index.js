const express = require('express');
const Auth = require('./auth')
const User = require('./user')
const Res = require('./res')
const Bill = require('./bill');
const Food = require('./food');
const bodyParser = require('body-parser');


const router = express.Router();

router.use('/auth', Auth);
router.use('/user', User);
router.use('/restaurant', Res);
router.use('/bill', Bill);
router.use('/food', Food);



module.exports = router