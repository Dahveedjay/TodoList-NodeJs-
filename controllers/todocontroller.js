const todoModel = require("../models/todo");

const getTodo = async (req, res) => {
// const allTodo = []
const allTodo = await todoModel.find()
  res.render("index", { allTodo });
};

const postTodo = async (req, res) => {
  const allTodo = await todoModel.find()
  const { todo } = req.body;
  if (todo === "" || todo === undefined || todo === null) {
    return res.render("index", {error:"The input field cannot be empty", allTodo});
  }
  await todoModel.create({
    title: todo,
  });
  const todos = await todoModel.find()


  return res.render("index", {success:"Todo added successfully", allTodo: todos});
};

const deleteTodo = async (req, res) => {
  const allTodo = await todoModel.find()
  const todoId = req.params.id;
  if (todoId === "" || todoId === undefined || todoId === null) {
    return res.render("index", {error:"Can not find todo Id", allTodo});
  }

  const todo = await todoModel.findOne({_id: todoId})
  console.log(todo)
  if(!todo){
    return res.render("index", {error:"Todo can not be found !", allTodo})
  }else{
    await todoModel.findByIdAndDelete(todoId);
    const todos = await todoModel.find()
    return res.render("index", {success:"Todo deleted successfully", allTodo: todos});
  }

 
};

const updateCompleted = async(req, res)=>{
  const allTodo = await todoModel.find()
  const todoId = req.params.id;
  if (todoId === "" || todoId === undefined || todoId === null) {
    return res.render("index", {error:"Can not find todo Id", allTodo});
  }

  const todo = await todoModel.findOne({_id: todoId})
  console.log(todo)
  if(!todo){
    return res.render("index", {error:"Todo can not be found !", allTodo})
  }else{
    await todoModel.findByIdAndUpdate(todoId, {completed: true});
    const todos = await todoModel.find()
    return res.render("index", {success:"Todo updated successfully", allTodo: todos});
  }
}

const editTodo = async(req, res)=>{
  const allTodo = await todoModel.find()
  const todoId = req.params.id
  const {title} = req.body

  if(title === "" || title === undefined || title === null){
    return res.render("index", {error:"", allTodo})
  }

  await todoModel.findByIdAndUpdate(todoId, {title: title})
  const todos = await todoModel.find()

  res.render("index", {success:"Todo updated successfully",allTodo: todos})
}

module.exports = { postTodo, getTodo, deleteTodo, updateCompleted, editTodo};
