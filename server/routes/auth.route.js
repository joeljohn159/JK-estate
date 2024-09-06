const express = require('express');
const {signUp, signIn, google} = require('../controllers/auth.controller')

const router = express.Router();

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/google', google)


module.exports = router;