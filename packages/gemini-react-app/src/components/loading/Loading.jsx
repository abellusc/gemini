import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';
import './Loading.scss';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Particles from 'react-particles-js';

class Loading extends React.Component {
    loadingSplash;
    rotator;
    constructor() {
        super();
        this.state = {
            start_time: Date.now(),
            done: false,
            rotationalDegrees: 0,
            _destroy: false,
        }

        let i = 0;
        const c = setInterval(() => {
            if (i++ > 3) {
                clearInterval(c);
                this.setState({
                    done: true
                });
                setTimeout(() => {
                    this.setState({
                        _destroy: true,
                    })
                }, 3000);
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
        clearInterval(this.rotator);
    }
    componentDidMount() {
        this.loadingSplash = document.getElementById('_loading');
    }
    render() {
        return (
            <>
            <div className={classnames({
                'Loading': true,
                'faded': this.state.done,
                'done': this.state.done,
                'destroyed': this.loadingSplash && this.state._destroy,
            })} id="_loading">
                <div className={classnames({
                    'app-title': true,
                    'done': this.state.done,
                })}>gemini</div>
                <div className="app-subtitle">decentralized artificial intelligence</div>
                <div className="app-copyright">&copy; 2020 Solstice Project - github.com/solsticeproject</div>
                <div className="app-spinner">
                    <FontAwesomeIcon icon={faSpinner} _nocache={Math.random()} className={classnames({
                        spinning: true,
                    })} id="spinner" style={{transform: `rotate(${(this.state.rotationalDegrees % 360)}deg)`}} />
                </div>
                <Particles className="particles" />
            </div>
            </>
        );
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Loading);