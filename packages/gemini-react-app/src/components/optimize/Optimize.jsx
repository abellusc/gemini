import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';

class Optimize extends React.Component {
    render() {
        return (
            <div className="Optimize">
                Optimize
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Optimize);