import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect';
import {autobind} from 'core-decorators';
import {reduxForm} from 'redux-form'
import  classnames  from 'classnames'
import {Link} from 'react-router'

import {getTowns} from 'actions/town'
import {addTown} from 'actions/dashboard'
import {getPosition} from 'actions/geolocation'

export const selector = createSelector(
    state => state.entities.towns,
    state => state.pages.addTown,
    (towns, page)=> {
        return {
            towns: page.towns.map((id)=> {
                return towns[id]
            })
        }
    }
);

@connect(selector, {
    getTowns,
    addTown,
})
export default class MainPage extends Component {
    constructor (props) {
        super(props)
    }

    @autobind
    find (data) {
        this.props.getTowns(data.town, {
            lat: data.lat,
            lon: data.lon
        });
    }

    render () {
        return (
            <div>
                <FindTownForm onSubmit={this.find}/>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Temp</th>
                        <th>Weather</th>
                        <th>Add</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.towns.map(town=> {
                        return <tr key={town.id}>
                            <td>{town.name}</td>
                            <td>{town.main.temp}</td>
                            <td>{town.weather[0].description}</td>
                            <td>
                                <button className="btn btn-default" onClick={()=>{this.props.addTown(town.id)}}>
                                    <i className="fa fa-plus"></i>
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

@reduxForm({
    form: 'findTown',
    fields: ['lon', 'lat', 'town'],
    validate: function (values) {
        const errors = {};
        if (!values.town && !values.lon && !values.lat) {
            errors.town = 'Required';
        }
        if ((values.lon && !values.lat) || (values.lat && !values.lon)) {
            errors.lon = 'Required';
            errors.lat = 'Required';
        }
        return errors;
    }
}, state => ({
    initialValues: {}
}), {
    getPosition
})
class FindTownForm extends Component {
    render () {
        const {
            fields: {town, lat, lon},
            handleSubmit,
            invalid,
            error,
            submitting
        } = this.props;

        return (
            <form onSubmit={handleSubmit} className="form-horizontal">
                <div className={classnames("form-group",{"has-error":town.error})}>
                    <label className="col-sm-2 control-label">Town</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" {...town}/>
                    </div>
                </div>
                <div className={classnames("form-group",{"has-error":lat.error || lon.error })}>
                    <label className="col-sm-2 control-label">Coordinates</label>
                    <div className="col-sm-5">
                        <input type="text" className="form-control" {...lat}/>
                    </div>
                    <div className="col-sm-5">
                        <input type="text" className="form-control" {...lon}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                        <button className="btn btn-default" disabled={invalid}>
                            <i className={classnames("fa",{"fa-spinner fa-spin":submitting})}></i> Find
                        </button>
                        <button type="button" className="btn btn-default" onClick={()=>{this.props.getPosition()}}>
                            Use my coordinates
                        </button>
                        <Link to={`/`}>
                            <button type="button" className="btn btn-default">
                                Cancel
                            </button>

                        </Link>
                    </div>
                </div>
            </form>)
    }
}