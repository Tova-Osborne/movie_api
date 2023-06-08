const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 


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
    Favorites: [{ type: mongoose.Schema.Types.ObjectID, ref:'Movie'}]
}); 

usersSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 8);
};

usersSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', usersSchema);

module.exports.Movie = Movie;
module.exports.User = User;
