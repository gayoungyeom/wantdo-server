const express = require('express');
const router = express.Router();
const bean = require('../controllers/bean');

router.get('/ping', bean.ping);
router.get('/getallcafes', bean.getAllCafes);
router.get('/getallbeans', bean.getAllBeans);
router.get('/getbeansbycafe', bean.getBeansByCafe);
router.get('/getbean', bean.getBean);

module.exports = router;
