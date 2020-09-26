var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlewareObj = require("../middleware");

//INDEX - Show all campgrounds
router.get("/campgrounds" , function (req , res) {
    //Getting data from database.
    Campground.find({},function(err,allcampground){
        if(err){
            console.log("Error Found" + err);
        }else{
            //req. user contains info of user currently loggedin.Is null otherwise.
            res.render("campgrounds/index",{campgrounds : allcampground});
        }
    });
});

//CRETATE - Add new campgrounds to database
router.post("/campgrounds",middlewareObj.isLoggedIn , function(req , res){
    // res.send("You hit the post request");
    var name        = req.body.name;
    var image       = req.body.image;
    var description = req.body.description;
    var author      = {
                    id : req.user._id,
                    username : req.user.username
    };
    console.log(description); 
    var newCampground = {name : name, image: image, description : description , author : author};
    //Create ne campground and save to DB
    Campground.create(newCampground, function(err, newCamp){
        if(err){
            console.log(err);
        }else{
            console.log(newCamp);
            res.redirect("/campgrounds");
        }
    });
});

//NEW - Show form to create new campgrounds
router.get("/campgrounds/new",middlewareObj.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});

//SHOW - Show selected campground
router.get("/campgrounds/:id", function(req,res){
//It is not req.body.id you moron ..!! It is req.params.id
    // Campground.find({},function(err, camp){
    //     console.log(camp);
    // });
    //Because of this populate, we can access the 'comments' collection through 'campgrounds' collection
    Campground.findById(req.params.id).populate("comments").exec(function(err , foundCamp){
        if(err){
            console.log(err);
        }else{
            if(foundCamp==null){
                console.log("Null value from database");
            }
            console.log("Show page called");
            // console.log(foundCamp);
            // res.send(foundCamp);
            res.render("campgrounds/show.ejs", {campground : foundCamp});
        }
    });
});


//UPDATE - Update existing campground
router.get("/campgrounds/:id/update",middlewareObj.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id,function(err , foundCamp){
        res.render("campgrounds/edit.ejs",{campground : foundCamp});
    });
});

router.put("/campgrounds/:id",middlewareObj.checkCampgroundOwnership,function(req , res){
    Campground.findByIdAndUpdate(req.params.id , req.body.campground , function(err, updatedCamp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id",middlewareObj.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds/" + req.params.id );
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;