import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop as computerIcon } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as common from '../../../common';
import Loader from 'react-loader-spinner';

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
                    <div className="expandable-spoiler-controls">
                    <button className="btn btn-secondary" onClick={() => this.toggleAdvancedData()}>{this.state.advanced_system_info_expanded ? 'Hide' : 'Show'} Advanced</button>
                    </div>
                    <div className="expandable-spoiler" id="spoiler1" style={{ display: (this.state.advanced_system_info_expanded ? 'inline-block' : 'none')}}>
                        { this.props.state.app.sys_info && this.props.state.app.sys_info.cpu ? (
                        <ul>
                        <li>CPU Temperature: {this.props.state.app.sys_info.cpu.temp.main}</li>
                        <li>CPU Load: {parseFloat(this.props.state.app.sys_info.cpu.load.currentload, 10).toFixed(2)}%</li>
                        </ul>
                        ) : <Loader type="Grid" width={10} height={10} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(SystemInformation);
