const mysql = require('mysql2/promise');
const dbconfig = require('../config/index').mysql;
const pool = mysql.createPool(dbconfig);

const controller = {
  async ping(req, res) {
    res.send({
      message: 'ok',
    });
  },
  async getAllCafes(req, res) {
    try {
      const [results] = await pool.query(`
            SELECT name
            FROM cafes
        ;`);

      res.send({ results });
    } catch (error) {
      console.log(error);
    }
  },
  async getAllBeans(req, res) {
    try {
      const query = req.query;
      const page = query.page;
      const count = query.count;

      const [results] = await pool.query(
        `
          SELECT b.name,
          b.image,
          c.name AS 'cafe'
          FROM beans AS b
          JOIN cafes AS c
          ON b.cafe_no = c.no
          LIMIT ? OFFSET ?
        `,
        [Number(count), Number(page * count)]
      );

      res.send({ results });
    } catch (error) {
      console.log(error);
    }
  },
  async getBeansByCafe(req, res) {
    try {
      const query = req.query;
      const cafe_no = query.cafe_no;
      const page = query.page;
      const count = query.count;

      const [results] = await pool.query(
        `
          SELECT b.name,
          b.image,
          c.name AS 'cafe'
          FROM beans AS b
          JOIN cafes AS c
          ON b.cafe_no = c.no
          WHERE b.cafe_no = ?
          LIMIT ? OFFSET ?
        `,
        [cafe_no, Number(count), Number(page * count)]
      );

      res.send({ results });
    } catch (error) {
      console.log(error);
    }
  },
  async getBean(req, res) {
    try {
      const query = req.query;
      const bean_no = query.bean_no;

      const [results] = await pool.query(
        `
        SELECT b.name,
        b.type,
        b.description,
        b.image,
        c.name AS 'cafe',
        r.name AS 'roasting'
        FROM beans AS b
        JOIN cafes AS c
        ON b.cafe_no = c.no
        JOIN roastings AS r
        ON b.roasting_no = r.no
        WHERE b.no = ?
      `,
        [bean_no]
      );

      const [origins] = await pool.query(
        `
        SELECT o.name
        FROM origins AS o
        JOIN beans_and_origins AS bo
        ON o.no = bo.origin_no
        WHERE bo.bean_no = ?
      `,
        [bean_no]
      );

      let result1 = [];
      origins.forEach((origin) => {
        result1.push(origin.name);
      });

      const [tastes] = await pool.query(
        `
        SELECT t.taste
        FROM tastes AS t
        JOIN beans_and_tastes AS bt
        ON t.no = bt.taste_no
        WHERE bt.bean_no = ?
      `,
        [bean_no]
      );

      let result2 = [];
      tastes.forEach((taste) => {
        result2.push(taste.taste);
      });

      res.send({
        results: { ...results[0], origins: result1, tastes: result2 },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = controller;
