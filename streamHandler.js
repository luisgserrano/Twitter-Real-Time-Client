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
        date:      changeDate(Date.parse(data['created_at']))
    };

    // Creating a new model instance with the new tweet
    const tweetEntry = new Tweet(tweet);

    // Saving in the database
    tweetEntry.save(function (err) {
        if (!err) {
            console.log('New Tweet');
            // converting unix timestamp to ISODate
            tweet.date = new Date(tweet.date).toISOString();
            io.emit('tweet', tweet);
        }
    });

    /**
     * The date received is converted to a JS date object, to convert to the PT timezone.
     * @param {*} date - date from the database
     */
    function changeDate(date) {
        let newDate = new Date(date);        
        return newDate.setTime( newDate.getTime() - (new Date().getTimezoneOffset() - 60) * 60 * 1000 );
    }

    /**
     * Check wether the user upload images or not checking if the media object is not undefined.
     * @param {*} media - media object from the database containing information about the tweet images
     */
    function checkTweetMedia(media) {

        if (typeof media !== 'undefined') {            
            return media[0]['media_url'];
        } else {
            return '';
        }

    }

};