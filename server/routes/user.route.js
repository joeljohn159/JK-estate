const express = require('express');
const userController = require('../controllers/user.controller');
const { updateUser} = require('../controllers/user.controller.js');
const {verifyToken} = require('../utils/verifyUser.js')

const router = express.Router();


router.get('/test', userController.test);
router.post('/update/:id' ,verifyToken, updateUser )

module.exports = router;