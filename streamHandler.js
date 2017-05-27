const Tweet = require('./Tweet');

module.exports = (data, io) => {

    // New tweet object
    const tweet = {
        tw_id:    data['id'],
        active:   false,
        username: data['user']['screen_name'],
        fullname: data['user']['name'],
        avatar:   data['user']['profile_image_url'],
        message:  data['text'],
        date:     data['user']['created_at']
    };

    // Creating a new model instance with the new tweet
    const tweetEntry = new Tweet(tweet);

    // Saving in the database
    tweetEntry.save(function (err) {
        if (!err) {
            // io.emit('tweet', tweet);
        }
    });

};