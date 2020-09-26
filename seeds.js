var mongoose    = require("mongoose");
var Comment     = require("./models/comment");
var Campground  = require("./models/campground");

//Few objects to be added in database
var data = [
    {
        name    :"Granite Hill",
        image   :"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN4O50fYlaB3K7Y-ZwTyLUy0pNRKQUG0qi-lTTcTAnXVTLEeUj",
        description : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name    :"Lake laky",
        image   :"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbuQShr87T0VceHhZ5ThhzlQYW1Zkw0sDPsJ4mn81yUWGA985m",
        description : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name    :"Kalsubai",
        image   :"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbuQShr87T0VceHhZ5ThhzlQYW1Zkw0sDPsJ4mn81yUWGA985m",
        description : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
];

function seedDB(){

    //remove all comments
    Comment.remove({},function(err){
        if(err){
            console.log("Error in comment creation" + err);
        }    
    });
    //remove all campgrounds
    Campground.remove({},function(err){
        console.log("All campgrounds removed"); 
             //Add a few campgrounds
     data.forEach(function(seed){
        Campground.create(seed,function(err, newlyAddedCampground){
            if(err){
                console.log(err);
            }else{
                console.log("A campground added");

                //create and add a comment
                Comment.create({
                    text : "This place is greate but i wish i had internet..!",
                    author : "Homer"
                },function(err, obj){
                    if(err){
                        console("Error in creating a comment");
                        console.log(err);
                    }else{
                        // console.log(newlyAddedCampground.description);
                        newlyAddedCampground.comments.push(obj);
                        newlyAddedCampground.save();
                        console.log("created a new comment");
                    }
                });
            }
        });
    });      
    });


}

module.exports = seedDB;