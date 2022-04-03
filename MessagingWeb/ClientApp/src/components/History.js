import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { useHistory } from "react-router";
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Button, FormGroup } from 'reactstrap';
import Moment from 'moment';
import Cookies from 'js-cookie'
import axios from 'axios'

export function History() {
    const [messages, setMessages] = useState(null);
    var historyDate = Cookies.get('historydate');
    var historyName = Cookies.get('historyname');
    const [beginDate, setBeginDate] = useState(historyDate ? historyDate : new Date().addMonth(-1));
    const [loading, setLoading] = useState(false);
    const [dates] = useState([
        { 'id': 1, 'name': 'Last month', 'date': new Date().addMonth(-1) },
        { 'id': 2, 'name': 'Two months', 'date': new Date().addMonth(-2) },
        { 'id': 3, 'name': 'Last year', 'date': new Date().addMonth(-12) }
    ]);
    const [dropDownValue, setDropDownValue] = useState(historyName ? historyName : 'Last month');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    function toggle(event) {
        setDropdownOpen(!dropdownOpen);
    }

    function changeValue(e) {
        let id = e.target.id - 1;
        setDropDownValue(e.target.innerText);
        setBeginDate(dates[id].date);
        Cookies.set('historydate', dates[id].date);
        Cookies.set('historyname', dates[id].name);
    }

    function getHistoryData(beginDate, user, setMessages, setLoading) {
        axios.get('message/history',
            {
                params: {
                    beginDate: Moment(beginDate).format('MM/DD/YY')
                },
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(
                (result) => {
                    setMessages(result.data);
                    setLoading(false);
                })
            .catch(function (error) {
                setMessages([]);
                setLoading(false);
                if (error.response.status == '401') {
                    logout();
                    history.push('/login');
                } else {
                    alert('An error occurred, please try again later.');
                }
            });
    }

    function handleUpdate(e) {

        setLoading(true);

        useEffect(() => {
            getHistoryData(beginDate, user, setMessages, setLoading);
        }, [beginDate, user, setMessages, setLoading]);
    }

    function logout() {
        setUser(null);
        Cookies.remove('token');
    }

    if (user !== null && !loading && !messages) {
        setLoading(true);
        getHistoryData(beginDate, user, setMessages, setLoading);
    }

    function renderHistoryTable(messages) {
        return (
            <div className='history-table'>
                {messages && messages.length > 0 &&
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>SendDate</th>
                                <th>Phone</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map(message =>
                                <tr key='{message.messageId}'>
                                    <td>{Moment(message.sendDate).format('DD/MM/yyyy HH:mm:ss')}</td>
                                    <td>{message.phone}</td>
                                    <td>{message.message}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
                { (!messages || messages.length == 0) && <p>The history is empty</p>}
            </div>
        );
    }

    let contents = user !== null
        ? loading
            ? <p><em>Loading...</em></p>
            : renderHistoryTable(messages)
        : <p><em>You are loged out</em></p>;

    return (
        <div>
            <h1 id="tabelLabel">History</h1>
            <Form onSubmit={handleUpdate}>
                <FormGroup className="row">
                    <div className="col-sm-10">
                        <ButtonDropdown isOpen={dropdownOpen} toggle={(event) => toggle(event.target.value)}>
                            <DropdownToggle caret>
                                {dropDownValue}
                            </DropdownToggle>
                            <DropdownMenu>
                                {dates.map(e => {
                                    return <DropdownItem id={e.id} key={e.id} onClick={(event) => changeValue(event)}>{e.name}</DropdownItem>
                                })}
                            </DropdownMenu>

                        </ButtonDropdown>

                    </div>
                    <Button className="btn btn-lg" type="submit">Update</Button>
                </FormGroup>
            </Form>
            {contents}
        </div>
    );
}

Date.prototype.addMonth = function (months) {
    const date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + months);
    return date;
};