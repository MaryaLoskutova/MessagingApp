import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { messages: [], loading: true };
    }

    componentDidMount() {
        this.getHistoryData();
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
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderHistoryTable(this.state.messages);

        return (
            <div>
                <h1 id="tabelLabel" >WhatsApp message history</h1>
                {contents}
            </div>
        );
    }

    async getHistoryData() {
        const response = await fetch('messagehistory',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwibmJmIjoxNjQ4NjQ5NjYyLCJleHAiOjE2NDg2OTI4NjIsImlhdCI6MTY0ODY0OTY2Mn0.raQVexQG_PQiALaw328EZWJdvv0mJ8mCEj0bYtQNykQ'
                }
            });

        const data = await response.json();
        this.setState({ messages: data, loading: false });
    }
}
