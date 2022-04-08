const express = require("express");
const NewArticle = express.Router();
const qs = require("querystring");
const db = require("../database");
const main = require("../index")
var mysql = require("mysql")
const tg = require("../router/tags");
const { redirect, render, json } = require("express/lib/response");
const { clearScreenDown } = require("readline");
const { stderr } = require("process");
const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'markdownbs',
    debug    :  false
});
const pool2 = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'markdownbs',
    debug    :  false
});
/* 
 if(req.method == "POST"){
        var body = "" ;// body variable have all data of queryString 
		req.on("data",function(data){ // if was req are data  (talabat li jaya tkoun data 5aznha fi body)
			body+=data;
		})
        req.on("end",function(){
            var post = qs.parse(body);// parse is (transofrme this string[body] to data for readable)
			res.render("NewArticle",{hi:"hello world"})
			console.log(post['title']);
			var record = {title:post['title'] , date:new Date(),mark:post['description'] , view:post['view']}
			db.query("INSERT INTO markdowndb1 SET ?",record,function(err,res){ // {"INSERT INTO user1 SET ?"} ==> code of mysql and (user1) is table of nodedb database of mysql	
				if(err)throw err ;
			})
        })
    }else{
       req.redirect()
    }



*/
NewArticle.use(express.urlencoded({extended:false}))


var data;

NewArticle.get("/NewArticle",tg.viwe)
NewArticle.get("/",(req,res,next)=>{
	pool.getConnection((err,connection)=>{
		connection.release();
		if(err)throw err;
		let code = "SELECT * FROM m2";
		connection.query(code,(err,data)=>{
			if(!err){
				console.log(data[0])
				res.render("index",{articles:data})}
			else{
				console.log(err);
			}
		})
	})
})
NewArticle.get("/delete/:id",(req,res,next)=>{
	let Id = req.params.id;
	console.log("deleted")

	let code = 'DELETE FROM m2 where id = ? ';
	
	pool.getConnection((err,connection)=>{
		connection.release();
		if(err)throw err;
		connection.query(code,[Id],(err,result)=>{
			if(!err){
				console.log("deleted")
				res.redirect("/");
			}else{
				console.log(err);
			}
		})
	})
})
function haveVoid( array){
    for(let i = 0 ; i<array.length;i++){
        if(array[i].value == "" || array[i].value == " "){
            return false;
        }
    }
    return true;
}
NewArticle.post("/NewArticle" , (req,res,next)=>{
 

	let date = new Date();
    let title = req.body.title;
    let mark = req.body.markdown;
    let discreption = req.body.description;
	let tg = req.body.tag;
	console.log(tg)
	let str = [];
	str.push(tg);
	
	pool.getConnection((err,connection)=>{
		if(err)throw err;
		console.log("Pool DB Connected!!",connection.threadId);
		str = JSON.stringify(str);
		console.log("str"+str)
		connection.query("INSERT INTO m2(title,date,description,mark,tag) VALUES (?,?,?,?,?)",[title,date,discreption,mark,str],(err ,row)=>{
			connection.release();
			if(!err){
				//res.render('index',{articles:row})
				res.redirect('/');
			}else{
				console.log(err);
			}
		})

	})




})
//NewArticle.post("/save",tg.CreatTag);

var date;
// Searching
NewArticle.post("/",(req,res,next)=>{
	let text = req.body.search;

	if(text[0]!="#")
		{
			
			pool.getConnection((err,connection)=>{
			if(err)throw err;
				connection.query("select * from m2 where title = ?",[text],(err,data)=>{
					connection.release();
					
					if(!err){
						res.render('index',{articles:data})
					}else{
						console.log(err);
					}
				})
			})
	
	}else{
		pool.getConnection((err,connection)=>{
			if(err)throw err;
			let a = "a";
				text = text.substr(1,text.length);
				text = text.toLowerCase();
				connection.query("select * from m2 where tag  like (?)",["%"+text+"%"],(err,data)=>{
					connection
					.release();
					
					if(!err){
						res.render('index',{articles:data})
					}else{
						console.log(err);
					}
				})
			})
	}
})
NewArticle.get("/show/:id",async(req,res,next)=>{
	let ID = req.params.id;
	let code = 'SELECT * FROM m2 where id = ? ';
	db.query(code,[ID] , async function(err , result){
		if(err)throw err;
		console.log(result[0])
		res.render("readmore",{title:result})
	})
})



module.exports = NewArticle;


/* 


var mysql = require("mysql");
var http = require("http");
var qs = require("querystring") ; // you have to install it using cmd (npm)
var html =
"<!DOCTYPE html><html><head></head><body>"+
"<form method='POST' action = '/' >"+
"<h1>Hello world</h1>"+

"<p>my name is abderraouf chebli</p></body>"+

"first name: <input name='firstname'><br>"+
"id : <input name='id'><br>"+
"<input type = 'submit'>"+
"</form>"+
"</body></html>";
let config = {
	host:'localhost',
	password : "password",
	user:"root",
	database:"nodedb",
}

let connection = mysql.createConnection(config);
connection.connect(function(err){
	if(err)throw err;
	console.log("yess")
})

var myhttp = http.createServer(function(req,res){
	if(req.method == 'POST'){
		var body = "" ;// body variable have all data of queryString 
		req.on("data",function(data){ // if was req are data  (talabat li jaya tkoun data 5aznha fi body)
			body+=data;
		})
		req.on("end",function(){ // when you finished posting(you should write this line of code)
			// show data if data is end 
			var post = qs.parse(body);// parse is (transofrme this string[body] to data for readable)
			res.end(JSON.stringify(post));
			console.log(post['firstname']);
			var record = {firstname:post['firstname'] , id:post['id']}
			connection.query("INSERT INTO user1 SET ?",record,function(err,res){ // {"INSERT INTO user1 SET ?"} ==> code of mysql and (user1) is table of nodedb database of mysql	
				if(err)throw err ;
				console.log(res.insertId)
			})
		})
	}
	else{
		res.end(html);
	}
})
myhttp.listen(1232);
console.log("listen");

*/