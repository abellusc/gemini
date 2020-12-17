import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';
import ErrorMessage from '../error/ErrorMessage';
import Monitor from './monitor/Monitor';
import SystemInformation from './sysinfo/SystemInformation';

class Dashboard extends React.Component {
    render() {
        if (!this.props.state || !this.props.state.app) {
            return JSON.stringify(this.props.state);
        }

        return (
            <>
            { this.props.state.app.common.errors.length > 0 ? (
            <>
                <ErrorMessage>
                    The following errors have been found.
                    <ul>
                        { this.props.state.app.common.errors.map(err => (
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

export default connect(((state, ownProps) => {
    const adv = common.mapStateToProps(state, ownProps);

    const {
        state: {
            app: {
                common,
            }
        },
        self,
    } = adv;

    return {
        state,
        self
    };
}), common.mapDispatchToProps)(Dashboard);