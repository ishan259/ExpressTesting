let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let mainSchema = new Schema({
	name : {type:'String',require:true},
	genre : 'String',
	year : 'Number'
},{collection:"picture", versionKey:false})
let myMovies = mongoose.model('picture',mainSchema);

module.exports = myMovies;