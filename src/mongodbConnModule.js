var mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/GCBA_Licitaciones";

module.exports.connect = function() {
	mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded");
	});
	return db;
}