var express     = require("express"),
    app         = express (),
    bodyPaser   = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride= require("method-override"),
    Comment     = require("./models/comment"),
    Campground  = require("./models/campground"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

var campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    indexRoutes         = require("./routes/index");


// seedDB();

//Connecting to the data base. The extra terms in {} are required (ref:Stack Overflow)
mongoose.connect("mongodb://localhost/yelp_camp_v8",{useNewUrlParser:true, useUnifiedTopology:true});
//Necessary line to use body-parser
app.use(bodyPaser.urlencoded({extended : true}));
//Setting view engine allows to render ejs files without .ejs extension
app.set("view engine" , "ejs" );
//__dirname will give us the the current directory address app.js is stored in.This is to tell app to use public directory
app.use(express.static(__dirname+"/public"));
//For the PUT and DELETE routes
app.use(methodOverride("_method"));
// app.set("views" , "views");
//===============================================================================
//PassPort configuration
app.use(require("express-session")({
    secret : "Once again i'm not gonna repeate",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//===============================================================================

//This to add our own little middleware to every route of the app
//In this specific middleware, we are passing user info to every route to check wheather logged in or not.
//It also passes the variable req.user in all ejs files by the name currentUser
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);





app.listen(5600 , function(){
    console.log("YelpCamp Server has been started");
});