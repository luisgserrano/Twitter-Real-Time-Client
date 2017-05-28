import React, { Component, PropTypes } from 'react';

class Tweet extends Component {

    static propTypes = {
        info: PropTypes.object.isRequired
    }

    state = {
        hasMedia: this.props.info.media_url === '' ? false : true
    }

    goToTweet = () => {
        window.location.href = 'https://twitter.com/' + this.props.info.username + '/status/' + this.props.info.tw_id;
    }

    render() {

        return (
            <article className={'tweet ' + (this.props.info.active ? 'active' : '')} onClick={ this.goToTweet }>
                <div className="tweet__container">
                    <div className="tweet__item">
                        <header className="tweet__header">
                            <a href={'https://twitter.com/' + this.props.info.username} className="account__link">
                                <div className="account__img">
                                    <img src={this.props.info.avatar} alt={ this.props.info.fullname } />	
                                </div>	
                                <span className="account__inline">
                                    <b className="account__fullname">{ this.props.info.fullname } </b>
                                    <span className="username txt-mute">@{this.props.info.username}</span>
                                    <time dateTime={ this.props.info.date } ></time>
                                </span>
                            </a>
                        </header>
                        <div className="tweet__body">
                            <p className="tweet__text">{this.props.info.message}</p>
                            
                            <div className={ 'tweet__media ' + (this.state.hasMedia ? 'show' : 'hidden') }>
                                <img src={ this.props.info.media_url } alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

}

export default Tweet;