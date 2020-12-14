import React from 'react';
import RD3 from 'react-d3-library';
import * as common from '../../../common';
import './Monitor.scss';
import { of } from 'rxjs';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

class Monitor extends React.Component {
    constructor(props) {
        super();
        this.state = {
            type: props.type || 'unknown',
            dataset: []
        };

        setInterval(() => {
            this.tick();
        }, 1000);

        const dataset$ = of(props.state.app.sys_info.load_history);

        dataset$.subscribe(value => {
            this.setState({
                dataset: value,
            });
        })
    }
    tick() {

    }
    render() {
        return (
            <div className="Monitor">
                {this.state.type !== 'unknown' ? RD3.createLineChart({
                    x_display_name: 'Time',
                    y_display_name: 'CPU',
                    width: this.props.width || 480,
                    height: this.props.height || 240,
                    dataset: this.state.dataset,
                }) : <Loader width={10} height={10} type="Grid" color="white" />}
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Monitor);