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

  // POST
todoRouter.post("/", (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
  
    let queryText = `INSERT INTO "todo" ("task", "timeAdded", "isImportant")
                       VALUES ($1, current_timestamp, $2);`;
    pool.query(queryText, [
        req.body.task,
        req.body.isImportant
      ])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });

  module.exports = todoRouter;