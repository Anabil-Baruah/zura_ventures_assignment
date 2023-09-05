const router = require('express').Router();
const {
    general_field,
    update_general,
    display_field,
    update_display
} = require('../controllers/Configurations')
const { baseURL, auth } = require("../auth")


router.get('/get_general_field/:id', auth, general_field)
router.post('/update_general_field', auth, update_general)
router.get('/get_dispaly_field/:id', auth, display_field)
router.post('/update_display_field', auth, update_display)

module.exports = router