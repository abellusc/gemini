import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop as computerIcon } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as common from '../../../common';

class SystemInformation extends React.Component {
    render() {
        console.log(this.props.state);
        return (
            <div className="SystemInformation module">
                <div className="header"><FontAwesomeIcon icon={computerIcon} style={{fontSize: '36px', verticalAlign: 'middle', lineHeight: '50px', marginRight: '20px'}} /> System Information</div>
                <div className="contents">
                    <ul className="list">
                    <li>Platform: {!!this.props.state.sys && !!this.props.state.sys.platform ? this.props.state.sys.platform.name : 'not reported by system'}</li>
                    <li>Release: {!!this.props.state.sys && !!this.props.state.sys.platform ? this.props.state.sys.platform.version : 'not reported by system'}</li>
                    <li>CPU: {!!this.props.state.sys && !!this.props.state.sys.cpu ? (
                        <>
                            {this.props.state.sys.cpu.model}, cores: {this.props.state.sys.cpu.cores} @ {this.props.state.sys.cpu.speed} GHz
                        </>
                     ) : 'not reported by system'}</li>
                    <li>GPU: TBD</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(SystemInformation);
