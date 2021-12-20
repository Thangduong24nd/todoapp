var express = require('express');
var router = express.Router();
var Todo = require('./../db/model/Todo');


router.get('/', (req, res) => {
    Todo.find({})
        .then(todo => {
            res.render('home', { todo: todo })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});
/**
 * Go to Create todo page
 */
router.get('/create', (req, res) => {
    res.render('create');
});

/**
 * Create todo
 */
router.post('/createtd', (req, res) => {
    let todo = new Todo({
        task: req.body.todoTask,

    });

    todo.save()
        .then(doc => {
            res.redirect('/')
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

/**
 * Go to Update Product page
 */
router.get('/update/:todoId', (req, res) => {
    Todo.findById(req.params.todoId, (err, todo) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.render('update', { todo: todo });
    })
});

/**
 * Delete todo
 */
router.delete('/:todoId', (req, res) => {
    let todoId = req.params.todoId;
    Todo.findByIdAndDelete(todoId, (err, doc) => {
        if (err) throw err;
        res.send(doc)
    })
    
});

/**
 * Update todo
 */
router.post('/:todoId', (req, res) => {
    let todoId = req.params.todoId;
    Todo.findByIdAndUpdate(
        { _id: todoId },
        { $set: { task:req.body.todoTask } }
        )
        .then(doc => {
            res.redirect('/')
        })
});

module.exports = router;