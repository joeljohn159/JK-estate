const express = require('express');
const userController = require('../controllers/user.controller');
const { updateUser, deleteUser} = require('../controllers/user.controller.js');
const {verifyToken} = require('../utils/verifyUser.js')

const router = express.Router();


router.get('/test', userController.test);
router.post('/update/:id' ,verifyToken, updateUser )
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;