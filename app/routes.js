import React from 'react';
import {Route} from 'react-router';
import App from 'containers/App'
import MainPage from 'pages/MainPage'

export default (
    <Route path="/" component={App}>
        <Route path="main" component={MainPage}/>
    </Route>
);
