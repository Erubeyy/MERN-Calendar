/*
    Events Routes
    host + /api/events
*/
const {Router} = require("express");
const {check} = require('express-validator')
const {fieldValidator} = require("../middlewares/field-validator");
const {validateJWT} = require('../middlewares/validar-jwt');
const {getEvents, createEvent, updateEvent, deleteEvent} = require("../controllers/events");
const {isDate} = require("../helpers/isDate");
const router = Router();


// Specify that every petition after this line must be validated
router.use(validateJWT)

// Obtain events
router.get('/', getEvents)

// Create new event
router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        fieldValidator
    ],
    createEvent)

// Update an event
router.put('/:id', updateEvent)

// Delete an event
router.delete('/:id', deleteEvent)

module.exports = router;

