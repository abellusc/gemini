import React from 'react';
import RD3 from 'react-d3-library';
import * as common from '../../../common';
import './Monitor.scss';
import { connect } from 'react-redux';

class Monitor extends React.Component {
    constructor(props) {
        super();
        this.state = {
            type: props.type || 'unknown',
            dataset: this.props.self.dataset || []
        };

        setInterval(() => {
            this.tick();
        }, this.props.self.interval || 5000);

        if (!props.self['onUpdateTick'] || typeof props.self['onUpdateTick'] !== 'function') {
            throw new Error('onUpdateTick must be a well-defined async function of how to retrieve the data each tick');
        }

        if (!props.self['onInit'] || typeof props.self['onInit'] !== 'function') {
            throw new Error('onInit must be a well-defined async funcntion of how to retrieve initial chart data.');
        }

        this.tick = this.tick.bind(this);
        this.getChartType = this.getChartType.bind(this);
        this.props.self['onUpdateTick'] = this.props.self['onUpdateTick'].bind(this);
        this.props.self['onInit'] = this.props.self['onInit'].bind(this);
    }

    tick(props) {
        props.self['onUpdateTick']().then((result) => {
            // set the new value of the data set via redux
        });
    }

    componentDidMount() {
        this.props.self['onInit']().then((result) => {
            // set the initial value of the data set via redux
        });
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

                return RD3.createLineChart(opts);
            default: throw new TypeError(`Unable to render unknown chart type '${type}': invalid chart type specified.`);
        }
    }

    render() {
        if (!this.props.state || this.props.state.app) {
            return '';
        }
        return (
            <div className="Monitor">
                {this.state.type !== 'unknown' ? this.getChartType(this.props.type) : ''}
            </div>
        )
    }
}

export default connect(((state, ownProps) => {
    const adv = common.mapStateToProps(state, ownProps);

    const {
        state: {
            app: {
                common,
                sys_info
            }
        },
        self,
    } = adv;

    return {
        state,
        self
    };
}), common.mapDispatchToProps)(Monitor);