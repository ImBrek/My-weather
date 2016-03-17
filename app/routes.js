import React from 'react';
import {Route} from 'react-router';
import App from 'containers/App'
import MainPage from 'pages/MainPage'
import AddTownPage from 'pages/AddTownPage'

export default (
    <Route path="/" component={App}>
        <Route path="main" component={MainPage}/>
        <Route path="add" component={AddTownPage}/>
    </Route>
);
