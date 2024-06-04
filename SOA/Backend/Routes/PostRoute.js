const { createPost,listPost,getById } = require('../Controllers/PostController');
const {userVerification} = require("../Middleware/AuthMiddleware")
const router = require('express').Router();

router.post('/api/Create',createPost);
router.get('/api/Posts' , listPost);
router.get('/api/Posts/:id',getById)
module.exports = router;