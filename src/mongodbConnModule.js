var mongoose = require('mongoose');

const uri = "mongodb://127.0.0.1:27017/GCBA_Licitaciones4";
// const uri = "mongodb+srv://GCBA:Mjggc3160@gcbalicitaciones.bteiv.mongodb.net/?retryWrites=true&w=majority";

module.exports.connect = function() {
	mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded"); 
	});
	return db;
}