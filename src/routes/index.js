const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const db_connection = require("../../connection");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/users", async (req, res) => {
  try {
    if (db_connection) {
      const db = db_connection.db("db_latihan");
      const users = await db.collection("users").find().toArray();
      res.send({ message: "Success Connected Database", data: users });
    } else {
      res.send({ message: "Connection Database Failed" });
    }
  } catch (error) {
    res.send({ message: error.message || "Internal Server Error" });
    console.log(error);
  }
});

router.post("/user", async (req, res) => {
  try {
    if (db_connection) {
      const { name, age, status } = req.body;

      const db = db_connection.db("db_latihan");
      const users = await db
        .collection("users")
        .insertOne({ name, age, status });

      res.send({ message: "success add user", data: users });
    } else {
      res.send({ message: "Connection Database Failed" });
    }
  } catch (error) {
    res.send({ message: error.message || "Internal Server Error" });
    console.log(error);
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    if (db_connection) {
      const { id } = req.params;
      const { name, age, status } = req.body;

      const db = db_connection.db("db_latihan");
      const users = await db
        .collection("users")
        .updateOne({ _id: ObjectId(id) }, { $set: { name, age, status } });

      res.send({ message: "success update user", data: users });
    } else {
      res.send({ message: "Connection Database Failed" });
    }
  } catch (error) {
    res.send({ message: error.message || "Internal Server Error" });
    console.log(error);
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    if (db_connection) {
      const { id } = req.params;

      const db = db_connection.db("db_latihan");
      const users = await db
        .collection("users")
        .deleteOne({ _id: ObjectId(id) });

      res.send({ message: "success delete user", data: users });
    } else {
      res.send({ message: "Connection Database Failed" });
    }
  } catch (error) {
    res.send({ message: error.message || "Internal Server Error" });
    console.log(error);
  }
});

module.exports = router;
