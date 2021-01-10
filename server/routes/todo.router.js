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

// PUT
todoRouter.put("/:id", (req, res) => {
    let isComplete = req.body.isComplete;
    let id = req.params.id;
    let queryText;
  
    console.log(isComplete);
  
    if (isComplete === "false") {
      queryText = `UPDATE "todo"
                  SET "isComplete" = true
                  WHERE "id" = $1;`;
    } else if (isComplete === "true") {
      queryText = `UPDATE "todo"
                  SET "isComplete" = false
                  WHERE "id" = $1;`;
    }
  
    console.log(`Updating task with ${id}, setting isComplete to:`, isComplete);
  
    pool.query(queryText, [id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(200);
      });
});

// DELETE
todoRouter.delete("/:id", (req, res) => {
    let task = req.params.id;
    console.log("Delete route called for task ", task);
  
    const queryText = `DELETE FROM "todo"
                        WHERE "id" = $1;`;
  
    pool.query(queryText, [task]).then((results) => {
      res.sendStatus(204);
    });
});

  module.exports = todoRouter;