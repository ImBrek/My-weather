import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {createSelector} from 'reselect';

import MainPage from 'pages/MainPage';

@connect(null, {})
export default class App extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const {children} = this.props;
        return (
            <div>
                HelloWorld
                {children || <MainPage/>}
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node
}

