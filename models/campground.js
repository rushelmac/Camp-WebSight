var mongoose = require("mongoose");

//Creating a schema for database
var campgroundSchema = new mongoose.Schema({
    name    : String,
    image   : String,
    description : String,
    author  : {
        id      : { 
            type    : mongoose.Schema.Types.ObjectId,
            ref     : "User"
        },
        username: String  
    },
    comments: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ] 
});

//Creating a model that allows to use methods on the variable name e.g. Campground.find()
module.exports = mongoose.model("Campground" , campgroundSchema);