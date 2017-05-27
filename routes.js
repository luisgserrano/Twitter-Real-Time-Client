const Tweet = require('./Tweet');

module.exports = {

    index(req, res) {

        // Calling static method to get tweets on database
        Tweet.getTweets(0, 0, tweets => {
            res.send(tweets);
        });

    },

    page(req, res) {

        // Fetch tweets by page and skip params
        Tweet.getTweets(req.params.page, req.params.skip, tweets => {
            res.send(tweets);
        });

    }

}