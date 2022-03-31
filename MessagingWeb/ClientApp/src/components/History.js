import React, { Component } from 'react';
import { UserContext } from '../UserContext';

export class History extends Component {
    static displayName = History.name;
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { messages: [], loading: true };
    }

    componentDidMount() {
        let { user } = this.context;
        if (user !== null) {
            this.getHistoryData();
        }
    }

    static renderHistoryTable(messages) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Phone</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map(message =>
                        <tr key={message.date}>
                            <td>{message.date}</td>
                            <td>{message.phone}</td>
                            <td>{message.message}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let { user } = this.context;
        let contents = user !== null
            ? this.state.loading
                ? <p><em>Loading...</em></p>
                : History.renderHistoryTable(this.state.messages)
            : <p><em>You are loged out</em></p>;

        return (
            <div>
                <h1 id="tabelLabel">WhatsApp message history</h1>
                {contents}
            </div>
        );
    }

    async getHistoryData() {
        let { user } = this.context;
        const response = await fetch('messagehistory',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            })
            .catch((err) => {
                console.error(err);
                alert('An error occurred, please try again later.');
            });

        const data = await response.json();
        this.setState({ messages: data, loading: false });
    }
}
