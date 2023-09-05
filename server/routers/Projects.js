const router = require('express').Router();
const {
    Create_project,
    get_all_proiects,
    add_field,
    get_all_fields,
    delete_field,
    edit_field,
    saveEdit
} = require('../controllers/Projects')
const { baseURL, auth } = require("../auth")


router.post('/create_project', auth, Create_project)
router.get('/get_project', auth, get_all_proiects)
router.post('/add_field', auth, add_field)
router.get('/get_all_fields/:id', auth, get_all_fields)
router.post('/delete_field', auth, delete_field)
router.get('/edit_field/:id/:recordId', auth, edit_field)
router.post('/save_edit_field', auth, saveEdit)

module.exports = router