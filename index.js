const express = require("express");
const app = express();
const router = require("./router/users");
const NewArticle = require("./router/NewArticle");
const port = 3000;
const connection = require("./database")
const flash = require("express-flash")

app.set("view engine","ejs");
app.set("index" , "./viwes/indx.ejs");
app.use("/views",express.static("public"))
app.use(express.urlencoded({extended:false}))

var code = `select * from markdowndb1`;
var data;

app.use(express.static('views'));

app.use("/" , NewArticle);

app.listen(port , '0.0.0.0',function(){console.log("Connected!  http://localhost:3001")});







/* const express = require("express");
const app = express();
const useRouter = require("./router/users");
const port = 3001;
app.set("view engine","ejs");
app.set("index","./views/index");
app.use("/",useRouter);
app.listen(port , ()=>{console.log("connectend with port: "+port)}) */