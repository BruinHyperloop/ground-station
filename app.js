const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'password',
    database    : 'groundstation'
});

//Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected.');
});

const app = express();

//Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE groundstation';
    db.query(sql, (err, result) => {
        var browserMessage = 'Database created.';
        var consoleMessage = result;

        if (err) {
            browserMessage = 'Error with database creation (likely has already been created).';
            consoleMessage = 'Error with database creation.'; 
        }

        console.log(consoleMessage);
        res.send(browserMessage);
    });
});

//Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        var browserMessage = 'Post table created.';
        var consoleMessage = result;

        if (err) {
            browserMessage = 'Error with table creation (likely has already been created).';
            consoleMessage = 'Error with table creation.'; 
        }

        console.log(consoleMessage);
        res.send(browserMessage);
    });
});

//Insert post1
app.get('/addpost1', (req, res) => {
    let post = {title: 'Post 1', body: 'This is post number 1'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        var browserMessage = 'Post 1 added.';
        var consoleMessage = result;

        if (err) {
            browserMessage = 'Error with post 1 adding (likely has already been created).';
            consoleMessage = 'Error with post 1 adding.'; 
        }

        console.log(consoleMessage);
        res.send(browserMessage);
    });
});

//Insert post2
app.get('/addpost2', (req, res) => {
    let post = {title: 'Post 2', body: 'This is post number 2'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        var browserMessage = 'Post 2 added.';
        var consoleMessage = result;

        if (err) {
            browserMessage = 'Error with post 2 adding (likely has already been created).';
            consoleMessage = 'Error with post 2 adding.'; 
        }

        console.log(consoleMessage);
        res.send(browserMessage);
    });
});

//Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result) => {
        var browserMessage = 'Posts fetched.';
        var consoleMessage = result;

        if (err) {
            browserMessage = 'Error with fetching posts.';
            consoleMessage = 'Error with fetching posts.'; 
        }

        console.log(consoleMessage);
        res.send(browserMessage);
    });
});

//Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        var browserMessage = 'Post fetched.';
        var consoleMessage = result;

        if (err) {
            browserMessage = 'Error with fetching post.';
            consoleMessage = 'Error with fetching post.'; 
        }

        console.log(consoleMessage);
        res.send(browserMessage);
    });
});

//Select single post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        var browserMessage = 'Post updated.';
        var consoleMessage = result;

        if (err) {
            browserMessage = 'Error with updating post.';
            consoleMessage = 'Error with updating post.'; 
        }

        console.log(consoleMessage);
        res.send(browserMessage);
    });
});

//Delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        var browserMessage = 'Post deleted.';
        var consoleMessage = result;

        if (err) {
            browserMessage = 'Error with deleting post.';
            consoleMessage = 'Error with deleting post.'; 
        }

        console.log(consoleMessage);
        res.send(browserMessage);
    });
});


app.listen('3000', () => {
    console.log('Server started on port 3000');
});

