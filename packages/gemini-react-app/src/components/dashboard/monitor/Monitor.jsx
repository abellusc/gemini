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

        this.tick = this.tick.bind(this);
        this.getChartType = this.getChartType.bind(this);
    }

    tick() {

    }

    getChartType(type) {
        switch (type) {
            case 'line': return RD3.createLineChart({
                x_display_name: 'Time',
                y_display_name: 'CPU',
                width: this.props.width || 480,
                height: this.props.height || 240,
                dataset: this.state.dataset,
            });
            default: throw new TypeError(`Unable to render unknown chart type '${type}': invalid chart type specified.`);
        }
    }

    render() {
        return (
            <div className="Monitor">
                {this.state.type !== 'unknown' ? getChartType(this.props.type) : ''}
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Monitor);