const express = require('express');
const router = express.Router();
const {postTodo, getTodo, deleteTodo, updateCompleted, editTodo} = require("../controllers/todocontroller")

router.get("/", getTodo)
router.post("/", postTodo)
router.get("/delete/:id", deleteTodo)
router.get("/update/:id", updateCompleted)
router.post("/edit/:id", editTodo)

module.exports = router