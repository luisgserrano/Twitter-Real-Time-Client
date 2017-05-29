import React, { Component, PropTypes } from 'react';
import { prettyDate } from '../helpers/prettyDate';

class Time extends Component {

    static propTypes = {
        time: PropTypes.string.isRequired
    }

    state = {
        timeConverted: ''
    }

    componentDidMount() {                
        setInterval(this.convertTime(), 5000);            
    }

    convertTime() {
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