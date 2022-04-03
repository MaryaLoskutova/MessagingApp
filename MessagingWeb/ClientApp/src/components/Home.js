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
            .then(res => res.json())
            .then(
                (res) => {
                    setMessage('');
                    setPhone('');
                    setResult('The message is sent');
                    setLoading(false);
                })
            .catch((err) => {
                console.error(err);
                alert('An error occurred, please try again later.');
                setLoading(false);
            })
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
                            onChange={(event) => setPhone(event.target.value)}
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
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </div>
                </FormGroup>
                <Button className="btn btn-md" type="submit">Send</Button>
            </Form>
            <p>{result}</p>
            <br />
            <History />
        </div>
    );
}


           

