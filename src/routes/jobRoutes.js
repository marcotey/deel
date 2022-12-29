const express = require('express')
const router = express.Router()
const controller = require('../controller/jobsController')

router.get('/unpaid', controller.get)
router.post('/:job_id/pay', controller.post)


module.exports = router