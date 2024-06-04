const { Signup, Login ,Profile } = require('../Controllers/AuthController');
const { userVerification } = require('../Middleware/AuthMiddleware');
const router = require('express').Router();

router.post('/register', Signup);
router.post('/login', Login);
router.post('/',userVerification);
router.get('/profile',Profile)
module.exports = router;
