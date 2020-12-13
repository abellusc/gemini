import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';

class Deploy extends React.Component {
    render() {
        return (
            <div className="Deploy">
                Deploy
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Deploy);