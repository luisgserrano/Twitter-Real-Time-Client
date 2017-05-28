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
