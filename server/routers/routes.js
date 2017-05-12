const express = require('express');
const UserModel = require('../../db/models/User.js');
const UserPodcast = require('../../db/models/User_Podcast.js');
const utils = require('../utils.js');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(200).sendFile('/index.html');
  })

router.route('/topTen')
  .get((req, res) => {
    utils.fetchTopTen((err, results) => {
      if (results) {
        res.send(results);
      }
    })
  })

router.route('/login/local')
  .get((req, res) => {
    res.redirect('/#/local/login')
  })

router.route('/signup')
  .post((req, res) => {
    UserModel.insertOne(req.body.username, req.body.password, (results)=> {
      if (results.name === 'error') {
        res.send('error');
      } else {
        res.send('success');
      }
    })
  })

router.route('/search')
  .post((req, res) => {
    let url = `https://itunes.apple.com/search?term=${req.body.search}&country=US&entity=podcast&media=podcast&limit=10`;
    utils.fetchCollections(url, (err, results) => {
      if (results) {
        res.status(200).send(results);
      } else {
        res.status(404).send('We are experiencing some technical difficulties...');
      }
    })
  });

router.route('/podcast')
  .post((req, res) => {
    let url = req.body.feedUrl;
    let collectionId = req.body.collectionId;
    utils.fetchEpisodes(url, collectionId, (err, results) => {
      if (results) {
        res.status(200).send(results);
      } else {
        res.status(404).send('Oopsies...seems we are down!');
      }
    });
  });

router.route('/search-rating')
 .get((req, res) => {
   UserPodcast.fetch("podcast_id", req.query.collectionIds, results => {
    if (results){
      res.status(200).send(results);
    }else{
      res.status(503).send('Service Unavailable')
    }
   });
 });

 router.route('/addRating')
 .post((req, res) => {
   console.log(req.body);
   UserPodcast.insertOne({ podcast_id: req.body.collectionId, rating: parseInt(req.body.rating)}, results => {
    console.log(results)
    if (results){
      res.status(200).send('success');
    }else{
      res.status(404).send('error')
    }
   });
 });


module.exports = router;
