const { redirect } = require("express/lib/response");
const mysql = require("mysql");
const { connect } = require("../database");


const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'markdownbs',
    debug    :  false
});

exports.CreatTag = (req,res)=>{
	console.log("HELLO")
	var tg = req.body._tag;
	let code = "INSERT INTO tags(tag) VALUE(?)";
    if(haveVoid(tg)){
        pool.getConnection((err,connection)=>{
            connection.release();
                if(err)throw err;
            tg = JSON.stringify(tg)
            console.log("-----------",tg.value,"tg");
            connection.query(code , [tg] , (err,data)=>{
                if(!err){
                    console.log(tg , tg == "" , tg == null);
                    res.redirect("/NewArticle")
    
                }else{
                    console.log(err);
                }
                
                
            })
        })
    }else{
        res.redirect("/NewArticle");
    }

}
exports.viwe = (req,res)=>{
    
    let code = "select * from tags";
    pool.getConnection((err,connection)=>{
        connection.release();
        if(err)throw err;
        connection.query(code , (err,data)=>{
            if(!err){
                res.render("NewArticle",{tgs:data})

            }else{
                console.log(err);
            }
        })
    })
}


