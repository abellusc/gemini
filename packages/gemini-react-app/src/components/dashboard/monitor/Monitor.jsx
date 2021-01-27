import React from 'react';
import * as RD3 from 'react-d3-library';
import * as common from '../../../common';
import './Monitor.scss';
import { connect } from 'react-redux';
import { ValueBar } from './bar/ValueBar';

class Monitor extends React.Component {
    constructor(props) {
        super();
        this.state = {
            type: props.type || 'unknown',
            dataset: props.self.dataset || []
        };

        if (!props.self['data_source'] || typeof props.self['data_source'] !== 'function') {
            throw new Error('data_source must be a well-defined async function of how to retrieve the data each tick');
        }

        this.tick = this.tick.bind(this);
        this.getChartType = this.getChartType.bind(this);
        props.self['data_source'] = props.self['data_source'].bind(this);

        this.props = props;

        setInterval(() => {
            this.tick(this.props);
        }, props.self.interval || 5000);
    }

    tick(props) {
        new Promise((resolve, reject) => {
            if (typeof props.self['data_source'] !== 'function')
                return reject(new Error('fn not defined'));
            return resolve(() => props.self['data_source']);
        })
        .then((dataResponse) => {
            // apply the response to the data via redux
        })
        .catch((e) => {
            console.error('error while retrieving monitor data from data source');
        })
    }

    getChartType(type) {
        switch (type) {
            case 'line': 
                let opts = {
                    x_display_name: 'Time',
                    y_display_name: 'CPU',
                    width: this.props.self.width || this.props.self.chartOptions.width || 480,
                    height: this.props.self.height || this.props.self.chartOptions.height || 240,
                    dataset: this.state.dataset || [],
                };

                if (this.props.chartOptions) {
                    opts = {
                        ...opts,
                        ...this.props.chartOptions,
                    };
                }
                return '';
            default: throw new TypeError(`Unable to render unknown chart type '${type}': invalid chart type specified.`);
        }
    }

    render() {
        if (!this.props.state || this.props.state.app) {
            return '';
        }
        return (
            <div className="Monitor">
                <div className="currentValues">
                    <ValueBar value={this.props.state.sys_info.cpu.load.currentload || 0.00} opts={{ maxValue: 100 }} />
                </div>
                <div className="cpuUsageChart">
                    {this.getChartType(this.props.self.type)}
                </div>
            </div>
        )
    }
}

export default connect((currentState, ownProps) => {
    const adv = require('../../../common').mapStateToProps(currentState, ownProps);

    const {
        state: {
            app: {
                common,
                sys_info,
            },
            sys,
        },
        self
    } = adv;

    return {
        state: {
            app: {
                common,
                sys,
            },
            sys_info
        },
        self,
    }
}, common.mapDispatchToProps)(Monitor);