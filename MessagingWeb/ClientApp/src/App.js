import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { History } from './components/History';
import { LogIn } from './components/LogIn';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/log-in' component={LogIn} />
                <Route path='/history' component={History} />
            </Layout>
        );
    }
}