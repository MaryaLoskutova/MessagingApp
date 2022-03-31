import React, { useState} from 'react';
import { Container } from 'reactstrap';
import Cookies from 'js-cookie'

import { NavMenu } from './NavMenu';
import { UserContext } from '../UserContext';

export function Layout(props) {
    const token = Cookies.get('token')
    const [user, setUser] = useState(token ? { token: token } : null);

    return (
        <div>
            <UserContext.Provider value={{
                user, setUser
            }}>
                <NavMenu />
                <Container>
                    {props.children}
                </Container>
            </UserContext.Provider>
        </div>
    );
}