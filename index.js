const express = require('express')
const app = express();
const cors = require("cors");
const path = require("path");
const dbms = require('./db');


app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

// app.get('/', async (req,res) => {
//     const listOfPosts = dbms.getPost((result) => {
//     console.log(result);
//     res.render('index',{title: 'Home',group:"Home",posts: result});
//     })
// }); 

app.get('/', (req,res) => {
    res.render('login_reg',{title: 'Home',group:"Home"});
});


app.get('/music', (req,res) => {
    const musicpost = dbms.getTypePost("Music",(result) => {
        res.render('index',{title:"Music", group:"Music",posts:result});
    })
})

app.get('/sports', (req,res) => {
    const musicpost = dbms.getTypePost("Sports",(result) => {
        res.render('index',{title:"Sports", group:"trophy",posts:result});
    })
})


//expanding
app.get('/getpostdetail/:pid',(req,res) => {
    const pid = req.params.pid;
    dbms.fetchPost(pid, (result) => {
        res.render('postdetails', {title: "postdetail", group:"sticky-note", detail:result});
    })
    
})

//create post
app.get('/createpost',(req,res) => {
    res.render('postform', {title:"Post Form", group:"sticky-note"});
});

app.post('/createpost', (req,res) => {
    console.log(req.body);
    const {title, message, posttype} = req.body;
    dbms.createPost(title, message, posttype, "Abhay", (result) => {
        if(result){
            res.redirect('/');
        } else {
            res.redirect('/createpost');
        }
    })
});

app.listen(3001, () => {
    console.log("Server running on port 3001")
});
