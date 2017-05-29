import React, { Component } from 'react';
import Tweet from './components/Tweet';
import NotificationBar from './components/NotificationBar';
import logo from './assets/images/hole19.png';
import twitterLogo from './assets/images/Twitter_Logo_Blue.png'
import './assets/sass/app.css';

import io from 'socket.io-client';
let socket = io('http://localhost:3000');

class App extends Component {

	state = {
		tweets: [],
		count: 0,
		page: 0,
		paging: false,
		skip: 0,
		done: false,
		hasScrolled: false
	}

	componentDidMount() {
		this.getInitialState();
		this.socketConnection();

		// Event listener for scroll, checking if the user want to see more tweets
		window.addEventListener('scroll', this.checkWindowScroll.bind(this));
	}

	socketConnection() {

		// On tweet event from server
		socket.on('tweet', data => {
			// Add Tweet to queue
			this.addTweet(data);
		});

	}

	addTweet(tweet) {

		// Get currente app state
		let tweets = this.state.tweets;

		// Increment the unread count
		let count = this.state.count + 1;

		// Increment the skip count
		let skip = this.state.skip + 1;

		// Add Tweet to the beginning of the array
		tweets.unshift(tweet);
		tweets.pop();


		// Set app state
		this.setState({ tweets: tweets, count: count, skip: skip });

	}

	showNewTweets() {

		// Get current app state
		let tweets = this.state.tweets;

		// Mark the tweets active
		tweets.forEach(tweet => {
			tweet.active = true;
		});

		this.setState({ tweets: tweets, count: 0 });

	}

	checkWindowScroll() {

		// Scroll position and window height
		let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		let scrollDistance = document.body.scrollTop;
		let hasScrolled = (height + scrollDistance) >= document.body.offsetHeight;


		if (hasScrolled && !this.state.paging && !this.state.done) {

			// set app state (new page)
			this.setState({ paging: true, page: this.state.page + 1});			

			// Get the next page of tweets from db
			this.getPage(this.state.page);

		} else if (scrollDistance > 400) {
			console.log(hasScrolled);
			this.setState({ hasScrolled: true });
		}
		 else {
			this.setState({ hasScrolled: false });
		}

	}

	getPage(page) {

		fetch('/page/' + page + '/' + this.state.skip, { accept: 'application/json' })
			.then(response => response.json(), err => {
				console.log('no more tweets?');
				this.setState({ paging: false, done: true });
			})
			.then(data => {
				this.loadPagedTweets(data);
			});

	}

	loadPagedTweets(tweets) {

		if (tweets.length > 0) {

			// get app state
			const data = this.state.tweets;

			tweets.forEach(tweet => {
				data.push(tweet);
			});

			setTimeout(() => {
				this.setState({ tweets: data, paging: false });
			}, 400);

		} else {
			this.setState({ done: true, paging: false });
		}

	}

	getInitialState() {
		fetch('/getTweets', { accept: 'application/json' })
			.then(response => response.json())
			.then(data => {
				this.setState({
					tweets: data
				});
			});
	}

	render() {
		return (
			<div id="top" className="app">
				<div className="app__header">
					<div className="container">
						<img src={twitterLogo} className="app__twitter" alt="Twitter" />
						<img src={logo} className="app__logo" alt="Hole19 Twitter client" />
						<h2>Hole19 Twitter client</h2>
					</div>
				</div>
				<div className="app__content">
					<NotificationBar show={ this.state.hasScrolled } count={ this.state.count } onShowNewTweets={ this.showNewTweets.bind(this) } />
					<section className="tweet__section">
						<div className="flex-auto position-rel flex flex-column height-p--100">
								<div className="column-scroller position-rel scroll-v flex-auto height-p--100 scroll-styled-v">
									{
										this.state.tweets.map(tweet => {
											return (
												<Tweet key={ tweet.tw_id } info={ tweet } />
											);
										})
										// console.log(this.state.tweets)
									}
								</div>
							</div>
					</section>
				</div>
			</div>
		);
	}
}

export default App;
