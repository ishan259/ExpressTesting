let express = require('express');
let myMovies = require('../model/schema');
const router = express.Router();

/* update movie */
router.put('/update/:name',(req,res)=> {
	myMovies.update({
		_name:req.params.name
		},{$set:
			{genre:req.body.genre,
			year:req.body.year}},
			(err,data)=> {
				if(err){
				console.log("error updating the movie");
				res.send("error updating the movie");
				} else {
				//console.log(data);
				res.json(data);
			}
		})
})

module.exports = router;