const { validate,create,getById} = require('../Controllers/ReservationController');
const router = require('express').Router();

router.post('/api/Reserve',create);
router.get('/api/Reserve/:id',getById)
module.exports = router;