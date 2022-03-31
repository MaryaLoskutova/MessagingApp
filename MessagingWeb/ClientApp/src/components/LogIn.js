import React, { useContext, useState, useRef, useEffect} from "react";
import { Form, Input, FormGroup, Label, Button } from 'reactstrap';
import { useHistory } from "react-router";
import Cookies from 'js-cookie'
import { UserContext } from '../UserContext';
import "./LogIn.css";

export function LogIn() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (user !== null) {
            history.push('/');
        }
    }, [history, user]);

    function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);

        fetch("user/authenticate",
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(
                    {
                        login: login,
                        password: password
                    })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    Cookies.set('token', result.token);
                    setUser({
                        login,
                        password,
                        token: result.token
                    });
                    setLoading(false);
                })
            .catch((err) => {
                console.error(err);
                alert('An error occurred, please try again later.');
                setLoading(false);
            })
    }

    return (
        <div>
            { loading && <div><p><em>Loading...</em></p></div>}
            { !loading &&
                <div className="Login"><Form onSubmit={handleSubmit}>
                    <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label" for="logininput">Login</Label>
                        <div className="col-sm-10">
                            <Input
                                autoFocus
                                id="logininput"
                                name="login"
                                type="text"
                                value={login}
                                placeholder="Login"
                                onChange={(event) => setLogin(event.target.value)}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-2 col-form-label" for="passwordinput">Password</Label>
                        <div className="col-sm-10">
                            <Input
                                id="passwordinput"
                                name="password"
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </FormGroup>
                    <Button className="btn btn-lg" type="submit">Log in</Button>
                </Form>
                </div>
            }
        </div>
    );
}