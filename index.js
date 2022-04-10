const express = require("express");
const app = express();
const router = require("./router/users");
const NewArticle = require("./router/NewArticle");
const port = 3000;
const connection = require("./database");
const flash = require("express-flash");
const cloud = require("cloud").example;
app.set("view engine","ejs");
app.set("index" , "./viwes/indx.ejs");
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname+"/viwes"))
var code = `select * from markdowndb1`;
var data;

app.use(express.static('views'));

app.use("/home" , NewArticle);

app.listen(port|process.env.PORT,function(){
    console.log("Connected!")
});






/* const express = require("express");
const app = express();
const useRouter = require("./router/users");
const port = 3001;
app.set("view engine","ejs");
app.set("index","./views/index");
app.use("/",useRouter);
app.listen(port , ()=>{console.log("connectend with port: "+port)}) */