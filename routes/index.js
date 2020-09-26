var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

//LANDING PAGE
router.get("/" , function(req,res){
    res.render("landing");
});

//=======================================
//Auth routes
//=======================================
//Show regiter form
router.get("/register", function(req,res){
    res.render("register");
});
//Register vs Login : In register we first make the database of new user and then, if successfully created, 
//authenticating it.Vs in login, we are directly authenticating the info taken from form.
router.post("/register",function(req,res){
    var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password , function(err , createdUser){
        if(err){
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});
//Login rout
router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",
{
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}) ,function(req, res){
    // res.send("Login logic goes here");
});

router.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/campgrounds");
});

module.exports = router;