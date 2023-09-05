const router = require('express').Router();
const { RegisterUser } = require('../controllers/Register')
const { baseURL, auth } = require("../auth")


router.post('/', RegisterUser)

module.exports = router