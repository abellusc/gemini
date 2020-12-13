import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';
import Loader from 'react-loader-spinner'

class Loading extends React.Component {
    getRandomSpinnerType() {
        const arr = [
            'Audio',
            'Ball-Triangle',
            'Bars',
            'Circles',
            'Grid',
            'Hearts',
            'Oval',
            'Puff',
            'Rings',
            'TailSpin',
            'ThreeDots'
        ];

        const n = Math.floor(Math.random() * arr.length - 1);

        return arr[n];
    }
    render() {
        return (
            <div className="Loading">
                <Loader
                    type={this.getRandomSpinnerType()}
                    color="#00BFFF"
                    height={'50%'}
                    width={'50%'}
                />
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Loading);