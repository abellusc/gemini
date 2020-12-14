import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';
import './Loading.scss';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class Loading extends React.Component {
    constructor() {
        super();
        this.state = {
            start_time: Date.now(),
            done: false,
            rotationalDegrees: 0,
        }

        let i = 0;
        const c = setInterval(() => {
            if (i++ > 3) {
                clearInterval(c);
                this.setState({
                    done: true
                });
            } else {
                this.setState({});
            }
        }, 1000);

        this.rotator = setInterval(() => {
            this.setState({
                rotationalDegrees: (this.state.rotationalDegrees + 1) % 360,
            });
        }, 1);
    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div className={classnames({
                'Loading': true,
                'faded': this.state.done,
            })}>
                <div className="app-title">gemini</div>
                <div className="app-subtitle">decentralized artificial intelligence</div>
                <div className="app-copyright">&copy; 2020 Solstice Project - github.com/solsticeproject</div>
                <div className="app-spinner">
                    <FontAwesomeIcon icon={faSpinner} _nocache={Math.random()} className={classnames({
                        spinning: true,
                    })} id="spinner" style={{transform: `rotate(${(this.state.rotationalDegrees % 360)}deg)`}} />
                </div>
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Loading);