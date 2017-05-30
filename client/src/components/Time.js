import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { prettyDate } from '../helpers/prettyDate';

class Time extends Component {

    static propTypes = {
        time: PropTypes.string.isRequired
    }

    state = {
        timeConverted: '',
        interval: ''
    }

    componentDidMount() {
        this.convertTime();

        let intervalId = setInterval(this.convertTime.bind(this), 5000);

        this.setState({ interval: intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    convertTime()  {
        let date = prettyDate(this.props.time);
        this.setState({timeConverted: date});
    }

    render() {
        return (
            <time dateTime={this.props.time}>{ this.state.timeConverted }</time>
        );
    }

}

export default Time;
