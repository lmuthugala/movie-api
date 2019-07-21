var express = require('express');
var router = express.Router();

let movieDetails = require('../data/movieDeails')

router.param("movieId",(req,res,next) => {
  //update the database with analyticl data.
  console.log("Someone hit a route that used the movieId Wildcard");
  next();
})

const requireJson = (req,res,next) => {
  if(!req.is("application/json")){
    res.json({msg:"Content Type Must Be Application/JSON"})
  } else {
    next();
  }
}

/* GET Top Rated Movies. */
router.get('/top-rated', function(req, res, next) {
  let page = req.query.page;
  if(page === undefined){
    page  = 1;
  }
  const results = movieDetails.sort((a,b)=>{
    return b.vote_average - a.vote_average;   
  });
  const indexToStart = (page -1)*20;
  res.status(200).json(results.slice(indexToStart,indexToStart+20));
});

/* GET movie By Id. */
router.get('/:movieId', function(req, res, next) {
  const movieId = req.params.movieId;
  const results = movieDetails.find((movie) =>{
    return movie.id === Number(movieId);
  })
  if(!results){
    res.status(204).json({
      msg:"Movie Not Found",
      status:204
    });
  } else {
    res.status(200).json(results);
  }
});

/* Post movie Rating By Id. */
router.post('/:movieId/rating',requireJson,(req,res,next)=>{
  const movieId = req.params.movieId;
  const userRating = req.body.value;
  if((userRating < 0.5) || (userRating > 10)){
    res.status(400).json({
      msg:"Rating must be between 0.5 and 10",
      status:400
    })
  } else {
    res.status(201).json({
      msg:"Thank you For Submitting your Rating.",
      status : 201
    })
  }
})

router.delete("/:movieId/rating",requireJson,(req,res,next)=>{
  res.status(200).json({msg:"Successfully Deleted",status:200})
})

module.exports = router;
