/**
 * Responds to an HTTP request with optional "count" field in the body.
 * Connects to twitter timeline to retrieve "count" latest tweets 
 * and display them
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */

// read in twitter credentials
var config  = require('./config.js');

// Setup twitter object
var Twit = require('twit');
var T = new Twit(config);

var params = {
    count: 5
}

exports.start = function start(req, res) { 
  // provide the option to client to supply 'count' of tweets
  if (req.body.count && req.body.count <= 200) {
    params.count = req.body.count;
  } else {
    params.count = 5;
  }

	T.get('statuses/home_timeline', params, function(err, data) {
      var text = '';
      // if there no errors
        if (!err) {
          // return text from tweets
          data.forEach(function(tweet){
          	text += '<b>' + tweet.user.screen_name + '</b>: ' + tweet.text + '<br/>';
          })
	      res.status(200).send(text);
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong');
        }
    });
};
