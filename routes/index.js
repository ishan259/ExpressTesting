let express = require('express');
let myMovies = require('../model/schema');

const router = express.Router();


router.get('/fetch',(req,res)=> {
	console.log("getting all movies");
	myMovies.find({},(err,docs)=> {
		if(err){
			console.log(err);
			res.send(err);
		} else {
			console.log(docs);
			res.json(docs);
		}
	})
})


router.get('/:id',(req,res)=> {
	console.log("getting a movie");
	myMovies.findOne({_id : req.params.id},(err,data)=> {
		if(err){
			console.log(err);
			res.send(err);
		} else {
			console.log(data);
			res.json(data);
		}
	})
})

module.exports = router;