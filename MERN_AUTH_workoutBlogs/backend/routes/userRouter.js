const {Router} = require('express');
const userController = require('../controllers/userController.js');

const router = Router();

//signing up new users | POST
router.post('/signup', userController.signupPost);

//Logging in new users | POST 
router.post('/login', userController.loginPost);

module.exports = router;