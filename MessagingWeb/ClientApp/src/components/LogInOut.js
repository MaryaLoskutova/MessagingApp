import React, { Component } from "react"
import { Form, Input, FormGroup, Label, Button } from 'reactstrap';
import "./LogInOut.css";

export class LogInOut extends Component {
    static displayName = LogInOut.name;

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            loading: false,
            error: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            loading: true,
        });


        fetch("user/authenticate",
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(
                    {
                        login: this.state.login,
                        password: this.state.password
                    })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        loading: false
                    });

                    setCookie("user", "token", result.token);
                    globalThis.state.jwt = result.token;
                    this.forceUpdate()
                },

                (error) => {
                    this.setState({
                        loading: false,
                        error
                    });
                }
            )
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        if (globalThis.state.jwt !== null)
            return (<div><p><em>You are loged in</em></p></div>)
        if (this.state.loading)
            return (<div><p><em>Loading...</em></p></div>)

        return (
            <div className="Login"><Form onSubmit={this.handleSubmit}>
                        <FormGroup className="row">
                            <Label className="col-sm-2 col-form-label" for="logininput">Login</Label>
                            <div className="col-sm-10">
                                <Input
                                    autoFocus
                                    id="logininput"
                                    name="login"
                                    type="text"
                                    value={this.state.login}
                                    placeholder="Login"
                                    onChange={this.handleInputChange}
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
                                    value={this.state.password}
                                    placeholder="Password"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </FormGroup>
                        <Button className="btn btn-lg" type="submit">Log in</Button>
                    </Form>
            </div>
        );
    }
}