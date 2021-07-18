const express = require('express');
const router = express.Router();
const bean = require('../controllers/bean');

router.get('/ping', bean.ping);

module.exports = router;
