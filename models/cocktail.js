const mongoose = require("mongoose"); // this imports the mongoose library

const cocktailSchema = new mongoose.Schema({ //  this creates the new schema for the structure of my data 
    name: String,
    isReadyToDrink: Boolean,
});

const Cocktail =  mongoose.model("Cocktail", cocktailSchema); // this creates the model tha we are going to export to server.js
 
module.exports = Cocktail; // this declares the variable cocktails as well exports the model that we created  