import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	state = {
		tweets: []
	}	

	componentDidMount() {
		this.getInitialState();
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
					{
						this.state.tweets.map(tweet => {
							return (
								<section className="tweet__section">
									<div className="flex-auto position-rel flex flex-column height-p--100">
										<div className="column-scroller position-rel scroll-v flex-auto height-p--100 scroll-styled-v">
											<article key={tweet.tw_id} className="tweet">
												<div className="tweet__container">
													<div className="tweet__item">
														<header className="tweet__header">
															<a href="#" className="account__link">
																<div className="account__img">
																	<img src={tweet.avatar} alt={ tweet.fullname } />	
																</div>	
																<span className="account__inline">
																	<b className="account__fullname">{ tweet.fullname }</b>
																	<span className="username txt-mute">@{tweet.username}</span>
																	<time dateTime={ tweet.date } ></time>
																</span>
															</a>
														</header>
														<div className="tweet__body">
															<p className="tweet__text">{tweet.message}</p>
															<div className="tweet__media">

															</div>
														</div>
													</div>
												</div>
											</article>
										</div>
									</div>
								</section>
							);
						})
						// console.log(this.state.tweets)
					}
				</div>
			</div>
		);
	}
}

export default App;
