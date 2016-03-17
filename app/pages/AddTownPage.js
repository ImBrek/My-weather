import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';

import {pageActivate} from 'actions/pages/index'
import AddTown from 'containers/AddTown'

@connect(null, {
    pageActivate: ()=>pageActivate('addTown')
})
export default class AddTownPage extends Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        this.props.pageActivate();
    }

    render () {
        return (
            <div>
                <div className="col-sm-6">
                    <AddTown/>
                </div>
                <div className="col-sm-6"></div>
            </div>
        )
    }
}
