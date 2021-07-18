const mysql = require('mysql2/promise');
const dbconfig = require('../config/index').mysql;
const pool = mysql.createPool(dbconfig);

const controller = {
  async ping(req, res) {
    res.send({
      message: 'ok',
    });
  },
};

module.exports = controller;
