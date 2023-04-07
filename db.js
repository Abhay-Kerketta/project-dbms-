const mysql = require('mysql2');
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});



const getPost = (func) => {
    const statement = "SELECT * from Post;";
    execution(statement, func);
}

const getTypePost = (type,func) => {
    const statement = `SELECT * from Post where typepost = '${type}'`;
    console.log(statement)
    execution(statement,func);
}


const execution = (sql, func) => {
    pool.execute(sql, function (err, result) {
        if (err) throw err;
        func(result);
    });

}

const createPost = (title, message, type, username,func) => {
    const statement = `insert into Post(title,message,typepost,author) values('${title}','${message}','${type}','${username}')`;
    pool.execute(statement, function(err, result) {
        if(err){
            func(false);
        } else {

            func(true);
        }

    })
}

const fetchPost = (id, func) => {
    const statement = `select * from Post where postid=${id}`;
    console.log(statement)
    pool.execute(statement, function(err,result)  {
        if(err) throw err;
        func(result);
    })
}

module.exports = { getPost, getTypePost,createPost,fetchPost}