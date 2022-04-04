import React, { useContext, useState } from "react";
import { Form, Input, FormGroup, Label, Button } from 'reactstrap';
import { UserContext } from '../UserContext';

import ReactPhoneInput from "react-phone-input-2";
import { History } from './History';

export function Home() {

    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const { user, setUser } = useContext(UserContext);

    function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);

        fetch("message/send",
            {
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(
                    {
                        phone: phone,
                        message: message
                    })
            })
            .then(
                (res) => {
                    if (!res.ok) {
                        setError(res.statusText);
                    } else {
                        setResult('The message is sent');
                    }
                    setLoading(false);
                })
            .catch(function (err) {
                setLoading(false);
            })

        setMessage('');
        setPhone('');
    }

    function handlePhoneChange(e) {
        setPhone(e.target.value);
        setError('');
        setResult('');
    }

    function handleMessageChange(e) {
        setMessage(e.target.value);
        setError('');
        setResult('');
    }

    return (
        <div className="sendMessage">
            <Form onSubmit={handleSubmit}>
                <FormGroup className="row">
                    <Label className="col-sm-2 col-form-label" for="phoneinput">Phone</Label>
                    <div className="col-sm-10">
                        <Input
                            id="phoneinput"
                            value={phone}
                            type="text"
                            placeholder="phone"
                            required
                            onChange={e => handlePhoneChange(e)}
                        />
                    </div>
                </FormGroup>
                <FormGroup className="row">
                    <Label className="col-sm-2 col-form-label" for="messageinput">Message</Label>
                    <div className="col-sm-10">
                        <Input
                            id="messageinput"
                            name="message"
                            type="textarea"
                            value={message}
                            maxLength={250}
                            placeholder="message"
                            required
                            onChange={e => handleMessageChange(e)}
                        />
                    </div>
                </FormGroup>
                {error && <div class="alert alert-danger" role="alert">{error}</div>}
                {result && <div class="alert alert-primary" role="alert">{result}</div>}
                <Button className="btn btn-md" type="submit">Send</Button>
            </Form>
            <br />
            <History />
        </div>
    );
}




