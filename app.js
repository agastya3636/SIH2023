const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var accname = "Sign Up";
var accicon = "fa-regular fa-user";
app.get("/", function(req, res){
    res.render("index", {accountname: accname, accounticon: accicon});
});

app.get("/login", function(req, res){
    res.render("login");
});
app.get("/signup", function(req, res){
    res.render("signup");
});
app.get("/about", function(req, res){
    res.render("about",{accountname: accname, accounticon: accicon});
});

app.post("/login", function(req, res){

    var name = req.body.accName;
    var emailid = req.body.email;
    var password = req.body.pass;
    
    accname = name
    accicon = "fa-solid fa-user";
    res.redirect("/");

});
app.post("/signup", function(req, res){
    var newname = req.body.newName;
    var newemailid = req.body.newemail;
    var newpassword = req.body.newpass;
    
    accname = newname
    accicon = "fa-solid fa-user";
    res.redirect("/");

});
app.post("/product1", function(req, res){
    res.render("product_details",{accountname: accname, accounticon: accicon})
});
app.get("/pricing", function(req, res){
    res.render("product_details", {accountname: accname, accounticon: accicon});
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});

