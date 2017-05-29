const Tweet = require('./Tweet');

module.exports = (data, io) => {
    
    // New tweet object
    const tweet = {
        tw_id:     data['id_str'],
        active:    false,
        username:  data['user']['screen_name'],
        fullname:  data['user']['name'],
        avatar:    data['user']['profile_image_url'],
        message:   data['text'],
        media_url: checkTweetMedia(data['entities']['media']),
        date:      new Date(Date.parse(data['created_at']))
    };

    // Creating a new model instance with the new tweet
    const tweetEntry = new Tweet(tweet);

    // Saving in the database
    tweetEntry.save(function (err) {
        if (!err) {
            io.emit('tweet', tweet);
        }
    });

    function checkTweetMedia(media) {

        if (typeof media !== 'undefined') {            
            return media[0]['media_url'];
        } else {
            return '';
        }

    }

};