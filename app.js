//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Hello !! Feel free to post all ur daily happenings here. A great way to keep track of your progress is to record every step of yours. Kep working hard for that goal of your's. All The Best ! To add a new Post type '/compose' at the end of the URL.";
const aboutContent = "A Daily Journal made with the purpose to track your daily progress and be aware of where you are heading.";
const contactContent = "Liked my work? Contact me and let's work together to make amazing things happen. Drop a mail at deepaksinha.1512@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://deepak-admin:testing1234@cluster1.rtwb9.mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

  

});

app.get("/posts/:postId", function(req, res){
  const requestedpostId = req.params.postId
  

  Post.findOne({_id : requestedpostId}, function(err,post){
    res.render("post", {
    title: post.title,
    content: post.content
  })
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully");
});
