const express = require('express')
const router = express.Router()
const controller = require('../controller/contractsController')

router.get('/:id', controller.get)
router.get('/', controller.getAll)


module.exports = router