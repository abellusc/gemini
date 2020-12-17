import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop as computerIcon } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as common from '../../../common';

const { ipcRenderer } = window;

class SystemInformation extends React.Component {
    _waiting = false;
    constructor(props) {
        super();
        this.state = {
            advanced_system_info_expanded: false,
        };

        this.toggleAdvancedData = this.toggleAdvancedData.bind(this);

        ipcRenderer.on('system_status', (event, response) => {
            props.dispatch(props.actions.setSystemStatus({ temp: response.cpu.temp, load: response.cpu.load }));
            this._waiting = false;
        });

        setInterval(() => {
            if (!this._waiting) {
                this._waiting = true;
                ipcRenderer.send('message', 'get_system_status');
            }
        }, 500);
    }

    toggleAdvancedData() {
        this.setState({
            advanced_system_info_expanded: !this.state.advanced_system_info_expanded,
        });
    }

    render() {
        if (!this.props.state || this.props.state.app) {
            return '';
        }

        console.log(this.props.state);
        return (
            <div className="SystemInformation module">
                <div className="header"><FontAwesomeIcon icon={computerIcon} style={{fontSize: '36px', verticalAlign: 'middle', lineHeight: '50px', marginRight: '20px'}} /> System Information</div>
                <div className="contents">
                    <ul className="list">
                    <li>Platform: {!!this.props.state.app.common.sys && !!this.props.state.app.common.sys.platform ? this.props.state.app.common.sys.platform.name : 'not reported by system'}</li>
                    <li>Release: {!!this.props.state.app.common.sys && !!this.props.state.app.common.sys.platform ? this.props.state.app.common.sys.platform.version : 'not reported by system'}</li>
                    <li>CPU: {!!this.props.state.common.sys && !!this.props.state.common.sys.cpu ? (
                        <>
                            {this.props.state.common.sys.cpu.model}, cores: {this.props.state.app.common.sys.cpu.cores} @ {this.props.state.app.common.sys.cpu.speed} GHz
                        </>
                     ) : 'not reported by system'}</li>
                    <li>GPU: TBD</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(((state, ownProps) => {
    const adv = common.mapStateToProps(state, ownProps);

    const {
        state: {
            app: {
                sys_info,
            }
        },
        self,
    } = adv;

    return {
        state,
        self
    };
}), common.mapDispatchToProps)(SystemInformation);
