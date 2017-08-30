let express = require('express');
let myMovies = require('../model/schema');
const router = express.Router();

/* insert movie */
router.post('/insert',(req,res)=> {
	myMovies.create(req.body,(err,data)=> {
		if(err){
			console.log("error while saving book");
			res.send("error while saving book");
		} else {
			console.log(data);
			res.send(data);
		}
	})
})

module.exports = router;