const express = require("express");
const todoRouter = express.Router();
const pool = require("../modules/pool.js"); // DATABASE POOL

// GET
todoRouter.get("/", (req, res) => {
    const queryText = `SELECT * FROM "todo" ORDER BY "timeAdded" DESC;`;
    pool
      .query(queryText)
      .then((result) => {
        console.log(result);
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  });

  module.exports = todoRouter;