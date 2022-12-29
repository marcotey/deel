const express = require('express')
const router = express.Router()
const controller = require('../controller/balanceController')

router.post('/deposit/:userId', controller.post)


module.exports = router