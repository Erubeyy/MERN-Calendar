/*
    User Routes / Auth
    host + /api/auth
*/
const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const { createUser, userLogin, revalidateToken } = require('../controllers/auth')

router.post(
    '/new',
    [ // middlewares
        check('name', 'Must define a Name').not().isEmpty(),
        check('email', 'Must define a Email').isEmail(),
        check('password', 'Password must have more than 6 letters').isLength({min: 6})
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'Must define a valid Email').isEmail(),
        check('password', 'Password must have more than 6 letters').isLength({min: 6})
    ],
    userLogin
);

router.get('/renew', revalidateToken);



module.exports = router;