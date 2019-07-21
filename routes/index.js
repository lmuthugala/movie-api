var express = require('express');
var router = express.Router();
let movies = require('../data/movies')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('index');
});

router.get('/most-populer',(req, res, next)=>{
  //get the page value from the Quary String.
  let page = req.query.page;
  if(page === undefined){
    page  = 1;
  }
  let data = movies.filter((movie)=>{
    return movie.most_popular;
  })
  let startingIndex = (page - 1) * 20;
  data = data.slice(startingIndex,startingIndex+19);
  res.status(200)
      .json({
          page,
          results:data});
})

module.exports = router;
