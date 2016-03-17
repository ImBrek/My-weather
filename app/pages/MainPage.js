import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import {Link} from 'react-router'
import  classnames  from 'classnames'

import {pageActivate} from 'actions/pages/index'
import {deleteTown} from 'actions/dashboard'
import {getTowns} from 'actions/town'

export const selector = createSelector(
    state => state.entities.towns,
    state => state.pages.main,
    (towns, page)=> {
        return {
            towns: page.towns.map((id)=> {
                return towns[id]
            }),
            townIds: page.towns,
            page
        }
    }
);

@connect(selector, {
    pageActivate: ()=>pageActivate('main'),
    getTowns,
    deleteTown
})
export default class MainPage extends Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        this.props.pageActivate();
    }

    render () {
        return (
            <div className="col-sm-6">
                <button className="btn btn-default" onClick={()=>{this.props.getTowns(null,null,this.props.townIds)}}>
                    <i className={classnames("fa fa-refresh",{"fa-spin":this.props.page.isFetching})}></i>
                </button>
                <Link to={`/add`}>
                    <button type="button" className="btn btn-default">
                        <i className="fa fa-plus"></i>
                    </button>
                </Link>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Temp</th>
                        <th>Weather</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.towns.map(town=> {
                        return <tr key={town.id}>
                            <td>{town.name}</td>
                            <td>{town.main.temp}</td>
                            <td>{town.weather[0].description}</td>
                            <td>
                                <button className="btn btn-default" onClick={()=>{this.props.deleteTown(town.id)}}>
                                    <i className="fa fa-minus"></i>
                                </button>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>

            </div>
        )
    }
}