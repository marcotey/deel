const express = require('express')
const router = express.Router()
const controller = require('../controller/adminController')

router.get('/best-profession', controller.get)
router.get('/best-clients', controller.getClients)


module.exports = router