var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

var middlewareObj = {};
middlewareObj.isLoggedIn = function(req, res, next){
    //If user is logged in next();
    if(req.isAuthenticated()){
        console.log("Middleware: User is logged in" + req.user);
        return next(); 
    }
        //If user isn't logged in res.redirect("/login");
        console.log("Login called form middleware");
        res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req , res , next){
    console.log("Authorization function called");
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err ,foundCamp){
            if(err){
                res.redirect("/campgounds");
            }else{
                console.log(foundCamp.author.id);
                console.log(req.user._id);
                if(foundCamp.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.send("You dont have the permission");
                    // res.redirect("/campgrounds");
                }
            }
        });
    }else{
        res.send("You need to be logged in to do that");
    }
};

middlewareObj.checkCommentOwnership = function(req , res , next){
    console.log("Authorization function called");
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err ,foundComment){
            if(err){
                res.redirect("/campgounds");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.send("You dont have the permission");
                    // res.redirect("/campgrounds");
                }
            }
        });
    }else{
        res.send("You need to be logged in to do that");
    }
} ;

module.exports = middlewareObj;