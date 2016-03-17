import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';

@connect(null, {})
export default class MainPage extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div>
                Page1
            </div>
        )
    }
}