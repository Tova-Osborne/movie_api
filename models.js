const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean,
    });


let usersSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthdate: Date,
    Favorites: [{ type: mongoose.Schema.Types.ObjectID, ref:'Movie'}]
}); 

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', usersSchema);

module.exports.Movie = Movie;
module.exports.User = User;