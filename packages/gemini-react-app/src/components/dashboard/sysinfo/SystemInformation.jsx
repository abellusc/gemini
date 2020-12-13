import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop as computerIcon } from '@fortawesome/free-solid-svg-icons';

export class SystemInformation extends React.Component {
    render() {
        console.log(this.props.state);
        return (
            <div className="SystemInformation module">
                <div className="header"><FontAwesomeIcon icon={computerIcon} /> System Information</div>
                <div className="contents">
                    <ul className="list">
                    <li>Platform: {this.props.state.platform ? this.props.state.platform.name : 'unknown'}</li>
                    <li>Release:</li>
                    <li>CPU:</li>
                    <li>GPU:</li>
                    </ul>
                </div>
            </div>
        );
    }
}