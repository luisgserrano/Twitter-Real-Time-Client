import React, { Component, PropTypes } from 'react';

class NotificationBar extends Component {

    static propTypes = {
        count: PropTypes.number.isRequired,
        onShowNewTweets: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired
    }

    render() {
        return (
            <div className={'notification-bar' + (this.props.show ? ' active' : '')}>
                <p>There are {this.props.count} new tweets! <a href="#top" onClick={this.props.onShowNewTweets}>Click here to see them.</a></p>
            </div>    
        );
    }

}

export default NotificationBar;