// we start by importing modules and loading express 
const express = require("express") // this imports the express framework to nodejs
const app = express ();  // this creates an instance of the express application 
const dotenv = require("dotenv"); // it is saying the program to require the package 
dotenv.config(); // it is saying to configure and load the enviroments variables from the .env file 
const mongoose = require("mongoose"); // this is saying to import the mongoose library 
const Cocktail = require ("./models/cocktail.js"); // this imports the model that i created in cocktail.js
const morgan = require("morgan");
const methodOverride = require("method-override"); // this is a middleware thattricks the express app into thinking that we did PUT and DELETE request from the browser
app.use(express.urlencoded({ extended: false })); // this is the middleware that extracts the data and converts it into a javascript onbject and then attaches it to the req.obj
app.use(methodOverride("_method")); // new
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI); // this is saying to connect to the using the connection string in the .env file



// now we log connection status to terminal on start
mongoose.connection.on ("connected", () => {
    console.log(`baby we are connected again but this time to ${mongoose.connection.name}.`)
});

app.get("/", async (req, res) => {
    res.render("index.ejs")
}); 

app.get("/cocktails", async (req, res) => {
    const allCocktails = await Cocktail.find();
    res.render("cocktails/index.ejs", { cocktails: allCocktails});
})

app.post("/cocktails", async (req, res) => {
    if (req.body.isReadyToDrink === "on") {
        req.body.isReadyToDrink = true;
    } else {
        req.body.isReadyToDrink = false;
    } 
    await Cocktail.create(req.body);
    res.redirect("/cocktails");
});

app.get("/cocktails/new", (req, res) => {
    res.render("cocktails/new.ejs")
});

app.get("/cocktails/:cocktailId", async (req, res) => {
    const foundCocktail = await Cocktail.findById(req.params.cocktailId);
    res.render("cocktails/show.ejs", { cocktail: foundCocktail });
  });
  
  app.delete("/cocktails/:cocktailId", async (req, res) => {
    await Cocktail.findByIdAndDelete(req.params.cocktailId);
res.redirect("/cocktails");
  });

  app.get("/cocktails/:cocktailId/edit", async (req, res) => {
    const foundCocktail = await Cocktail.findById(req.params.cocktailId);
    res.render("cocktails/edit.ejs", {
        cocktail: foundCocktail,
    });
  });

app.put("/cocktails/:cocktailId", async (req, res) => {
    if (req.body.isReadyToDrink === "on") {
        req.body.isReadyToDrink = true;
    } else {
    req.body.isReadyToDrink = false;
    }
    
    await Cocktail.findByIdAndUpdate(req.params.cocktailId, req.body);

    res.redirect(`/cocktails/${req.params.cocktailId}`);
});

app.listen(3000, () => {
 console.log("we are in babyyyyyyy")
});
 