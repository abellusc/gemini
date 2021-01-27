import React from 'react';
import * as common from '../../common';
import { connect } from 'react-redux';
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
                <SystemInformation />
                <Monitor type="line" data_source={async () => ([])} width={500} height={200} />
            </div>
            </>
        )
    }
}

export default connect((currentState, ownProps) => {
    const adv = require('../../common').mapStateToProps(currentState, ownProps);

    // property deconstruction go brrrrrr
    const {
        state: {
            app: {
                common,
            }
        },
        self,
    } = adv;

    return {
        state: {
            app: {
                common,
            }
        },
        self
    };
}, common.mapDispatchToProps)(Dashboard);