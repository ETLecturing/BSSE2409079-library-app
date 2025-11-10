const express = require('express');
const router = express.Router();
const memberControllers = require('../controllers/memberControllers');

router.post('/api/register', memberControllers.createMember);
router.post('/api/login', memberControllers.loginMember);

module.exports = router;