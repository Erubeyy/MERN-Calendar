/*
    User Routes / Auth
    host + /api/auth
*/
const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {validateJWT} = require('../middlewares/validar-jwt');

const { createUser, userLogin, revalidateToken } = require('../controllers/auth')
const {fieldValidator} = require("../middlewares/field-validator");

router.post(
    '/new',
    [ // middlewares
        check('name', 'Must define a Name').not().isEmpty(),
        check('email', 'Must define a Email').isEmail(),
        check('password', 'Password must have more than 6 letters').isLength({min: 6}),
        fieldValidator
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'Must define a valid Email').isEmail(),
        check('password', 'Password must have more than 6 letters').isLength({min: 6}),
        fieldValidator
    ],
    userLogin
);

router.get('/renew', validateJWT, revalidateToken);



module.exports = router;
