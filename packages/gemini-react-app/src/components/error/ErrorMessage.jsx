import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';

class ErrorMessage extends React.Component {
    render() {
        return (
            <>
                <div className="Error">
                    <div className="header"><span class="icon icon-attention"></span><span>Error</span></div>
                    <div className="contents">
                        {this.props.children}
                    </div>
                    <div className="footer">
                        <div className="pull-right">
                            <button className="btn btn-link" href="https://github.com/abellusc/gemini/issues" target="_new" noreferrer>Report Error to Developers</button>
                        </div>
                    </div>
                </div>
                <br />
            </>
        )
    }
}

export default connect((currentState, ownProps) => {
    const adv = require('../../common').mapStateToProps(currentState, ownProps);

    const {
        state: {
            app
        },
        self,
    } = adv;

    return {
        state,
        self
    };
}, common.mapDispatchToProps)(ErrorMessage);