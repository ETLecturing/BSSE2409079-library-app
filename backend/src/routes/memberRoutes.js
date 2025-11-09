const express = require('express');
const router = express.Router();
const memberControllers = require('../controllers/memberControllers');

router.post('/api/registerMember', memberControllers.createMember);

module.exports = router;