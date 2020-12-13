import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';
import Loader from 'react-loader-spinner'

class Loading extends React.Component {
    render() {
        return (
            <div className="Loading">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={'50%'}
                    width={'50%'}
                />
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Loading);