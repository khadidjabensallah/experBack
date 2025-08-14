const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
title: String,
body: String,
numOfLikes: Number
});//this is like bleuprint
const article =mongoose.model("article", articleSchema)// two params the name of the table and the blueprint (schema)
//and a model is a tool/object that lets you create, read, update, and delete data following that blueprint.
module.exports = article;