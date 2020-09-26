var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middlewareObj = require("../middleware");

//=======================================
//COMMENTS ROUTES
//=======================================

router.get("/campgrounds/:id/comments/new",middlewareObj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id , function(err, foundCampground){
        if(err){
            console.log("Failed to find campground by id" + err);
        }else{
            res.render("comments/new", {campground : foundCampground });
        }
});
});
//Why to add middleware to post request ? :- B'z the one above is just hiding the form from user.
//One can still hit a post request using postman
router.post("/campgrounds/:id/comments",middlewareObj.isLoggedIn,function(req,res){
    //find the campground by using id
    Campground.findById(req.params.id , function(err , foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err, createdComment){
                if(err){
                    console.log("Error in comment creation");
                }else{
                    //Add username and id to the comment and save it
                    createdComment.author.id       = req.user._id;
                    createdComment.author.username = req.user.username;
                    createdComment.save();
                    console.log(createdComment); 
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
    //Add the comment
    //save to data base
    //render the show page
});

//Update comment route
router.get("/campgrounds/:id/comments/:comment_id/edit",middlewareObj.checkCommentOwnership,function(req, res){
    Comment.findById(req.params.comment_id, function(err , foundComment){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("comments/edit.ejs",{campground_id : req.params.id, comment : foundComment});
        }
    });
});

router.put("/campgrounds/:id/comments/:comment_id",middlewareObj.checkCommentOwnership,function(req , res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err , updatedComment){
        if(err){
            res.redirect("/campgrounds/"+ req.params.id);
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//Delete comment
router.delete("/campgrounds/:id/comments/:comment_id",middlewareObj.checkCommentOwnership,function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err){
        res.redirect("/campgrounds/"+req.params.id);
    });
});


module.exports = router;