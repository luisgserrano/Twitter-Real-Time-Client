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

    /**
     * The time received from props is converted to a new form when the component mounts.
     * On each 20s, the method convertTime runs to check the time of the tweet compared with actual datetime.
     */
    componentDidMount() {
        this.convertTime();

        let intervalId = setInterval(this.convertTime.bind(this), 20000);

        this.setState({ interval: intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    /**
     * The date received from props is converted using a Helper function to make him in other format.
     * After the date is converted, the state is set with the new date.
     */    
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
