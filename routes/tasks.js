const express = require('express');
const fs = require('fs');
const Task = require('./../models/Task');

let tasks = JSON.parse(fs.readFileSync('./tasks.json'));
const router = express.Router();
router.use(express.json());

const flushTasks = (tasks) => {
  fs.writeFile('./tasks.json', JSON.stringify(tasks), err => {
    if(err)
      console.log(err);
  });
}

const getAllTasks = (req, res) => {
  res.status(200).json({
    status: 'success',
    tasks
  });
}

// TODO: id is getting bigger with no limit what to do with it?
const createTask = (req, res) => {
  let id;
  let body = req.body;
  if(tasks == false)
    id = 0;
  else
    id = tasks[tasks.length-1].id+1;
  let task = new Task(id, body.title, body.desc, body.deadline);
  tasks.push(task);
  flushTasks(tasks);
  res.status(201).json({
    status: 'success',
    message: 'written successfuly'
  });
}

const getTask = (req, res) => {
  const index = tasks.findIndex(elem => elem.id == req.params.id);
  if(deleteIndex == -1)
    return res.status(404).json({
      status: 'fail',
      message: 'not found'
    });
  res.status(200).json({
    status: 'success',
    task: tasks[index]
  })
}

const updateTask = (req, res) => {
  let task = tasks.find((task) => task.id == req.body.id);
  task.title = req.body.title;
  task.desc = req.body.desc;
  task.deadline = req.body.deadline;
  task.completed = req.body.completed;
  flushTasks(tasks);
  res.status(201).json({
    status: 'success',
    message: 'updated successfuly'
  });
}

const deleteTask = (req, res) => {
  const deleteIndex = tasks.findIndex(elem => elem.id == req.params.id);
  if(deleteIndex == -1)
    return res.status(404).json({
      status: 'fail',
      message: 'not found'
    });
  tasks.splice(deleteIndex, 1);
  flushTasks(tasks)
    res.status(200).json({
      status: 'success',
      message: 'accepted'
    });
}

router.param('id', (req, res, next, id) => {
  if(id > tasks[tasks.length-1])
    return res.status(400).json({
      status: 'fail',
      message: 'id is invalid'
    })
  next();
})

router
  .route('/')
  .get(getAllTasks)
  .post(createTask)

router
  .route('/:id')
  .get(getTask)
  .delete(deleteTask)
  .put(updateTask)

module.exports = router;