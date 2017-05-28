import React, { Component } from 'react';
import Tweet from './components/Tweet';
import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client';
let socket = io('http://localhost:3000');

class App extends Component {

	state = {
		tweets: [],
		count: 0,
		page: 0,
		paging: false,
		skip: 0,
		done: false
	}	

	componentDidMount() {
		this.getInitialState();
		this.socketConnection();

		window.addEventListener('scroll', this.checkWindowScroll.bind(this));
	}

	socketConnection() {

		// Preserve this reference
		const self = this;

		// On tweet event from server		
		socket.on('tweet', data => {
			// Add Tweet to queue
			console.log(data)
			self.addTweet(data);
		});
	}

	addTweet(tweet) {

		// Get currente app state
		const tweets = this.state.tweets;

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
		const tweets = this.state.tweets;

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

		console.log(document.body.offsetHeight);
		console.log(height);
		console.log(scrollDistance);
		console.log(hasScrolled);
		

		if (hasScrolled && !this.state.paging && !this.state.done) {

			// set app state (new page)
			this.setState({ paging: true, page: this.state.page + 1 });

			// Get the next page of tweets from db
			this.getPage(this.state.page);

		}
		
	}

	getPage(page) {

		fetch('/page/' + page + '/' + this.state.skip, { accept: 'application/json' })
			.then(response => response.json(), err => {
				console.log('no more tweets?');
				this.setState({ paging: false, done: true });
			})
			.then(data => {
				console.log(data);
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
			}, 1000);

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
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<div className="App-intro">
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
