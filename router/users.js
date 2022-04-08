/* const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>{
    res.send("page1");
})

router.get("/page2",(req,res,next)=>{
    res.render("index" , {name:"abderraouf!!!!"});
})

module.exports = router; */


const express = require("express");
const router = express.Router();


router.get("/",function(req,res,next){

    res.send("Welcome to page one");
})
router.get("/page2",function(req,res,next){
    res.send("Welcome to page 2");


})

router.get("/programmer",function(req,res,next){
    res.render("index",{name:"abdraouf chebli (arf19)"})
})

module.exports = router;