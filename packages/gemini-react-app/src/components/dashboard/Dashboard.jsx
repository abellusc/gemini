import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';
import ErrorMessage from '../error/ErrorMessage';
import Monitor from './monitor/Monitor';
import SystemInformation from './sysinfo/SystemInformation';

class Dashboard extends React.Component {
    render() {
        return (
            <>
            { this.props.state.app.errors.length > 0 ? (
            <>
                <ErrorMessage>
                    The following errors have been found.
                    <ul>
                        { this.props.state.app.errors.map(err => (
                            <>
                                <li>({err.code}) {err.message}</li>
                            </>
                        ))}
                    </ul>
                </ErrorMessage>
            </>
            ) : '' }
            <div className="Dashboard feature">
                <div className="container">
                    <SystemInformation />
                    <Monitor type="line" />
                </div>
            </div>
            </>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Dashboard);