
let express = require('express');
let myMovies = require('../model/schema');
const router = express.Router();

router.delete('/delete/:name',(req,res)=> {
	myMovies.remove({name:req.params.name},(err,data)=> {
		if(err){
		console.log("error deleting the movie");
		res.send("error deleting the movie");
		} else {
		console.log(data);
		res.send(data);
		}
	})
})

module.exports = router;