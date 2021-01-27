import React from 'react';
import './ValueBar.scss';

export class ValueBar extends React.Component {
    opts = null;
    defaultOpts = {
        maxValue: 0,
        style: {
            container: {},
            bar: {},
            value: {}
        }
    };

    constructor(props) {
        super();
        if (!props.value) {
            throw new Error('ValueBar does not have a value bound to its properties.');
        }
        
        this.opts = {
            ...this.defaultOpts,
            ...(props.opts || {}),
        };
    }

    render() {
        if (!this.props || !this.opts) return '';
        return (
            <div className="ValueBar" style={{ ...this.opts.style.container }}>
                <div className="bar" style={{ ...this.opts.style.bar }}></div>
                <div className="value" style={{
                    ...this.opts.style.value,
                    width: `${(100 * (this.props.value / this.opts.maxValue))}%`
                }}>{100* (this.props.value / this.opts.maxValue)}%</div>
            </div>
        )
    }
}