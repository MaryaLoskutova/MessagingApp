import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { LogInOut } from './components/LogInOut';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        globalThis.state = {
            jwt: null
        };
    }

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/log-in-out' component={LogInOut} />
            </Layout>
        );
    }
}