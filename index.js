var twit = require("twit");
var CronJob = require('cron').CronJob;

var Twitter = new twit({
    consumer_key: '********************',
    consumer_secret: '************************',
    access_token: '******************',
    access_token_secret: '****************',
    timeout_ms: 60 * 1000,
    strictSSL: true,
})

var retweet = function () {
    var params = {
		q: '#cybersecurity',    
        result_type: 'mixed' 
    }
    Twitter.get('search/tweets', params, function (err, data) {
        if (!err) {
				
	    for (let pas = 0; pas < 15; pas++) {
		// Start retweet
                var retweetId = data.statuses[pas].id_str;

                Twitter.post('statuses/retweet/:id', {
                    id: retweetId
                }, function (err, response) {
                    if (err) {
                        console.log('Problem when retweeting. Possibly already retweeted this tweet!');
                    } else {
                        console.log('Retweeted =)');
                    }
                }); // End retweet
	    }
        }
        else {
            console.log('Error during tweet search call');
        }
    });
};

const job = new CronJob('0 */1 * * * *', function() {
	retweet();
});

job.start();
