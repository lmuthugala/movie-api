var express = require('express');
var router = express.Router();
const movies = require('../data/movies');
const people = require('../data/people');

const queryRequired = (req,res,next) => {
  const searchTerm = req.query.query;
  if(!searchTerm){
    res.json({
      msg:"Quary is required."
    })
  } else {
    next();
  }
}

//THis middlewear will be used bu all routes under search
router.use(queryRequired);

//GET Search/movie
router.get('/movie',queryRequired,(req,res,next) => {
  const searchTerm = req.query.query;
  const results = movies.filter((movie)=>{
    let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  })
  res.json({results});
})

//GET Search/movie
router.get('/person',queryRequired,(req,res,next) => {
  const searchTerm = req.query.query;
  const results = people.filter((person)=>{
    let found = person.name.includes(searchTerm);
    return found;
  })
  res.json({results})
})

module.exports = router;
