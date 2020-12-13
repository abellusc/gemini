import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';

class Validate extends React.Component {
    render() {
        return (
            <div className="Validate">
                Validate
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Validate);