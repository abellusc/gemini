import React from 'react';
import { connect } from 'react-redux';
import * as common from '../../common';
import '../components.scss';
import './Loading.scss';

class Loading extends React.Component {
    constructor() {
        super();
        this.state = {
            start_time: Date.now()
        }
    }
    render() {
        return (
            <div className="Loading" style={{ opacity: (Date.now() - this.state.start_time) > 3000 ? this.props.opacity : '1' }}>
                <div className="app-title" style={{ opacity: (Date.now() - this.state.start_time) > 3000 ? this.props.opacity : '1' }}>gemini</div>
                <div className="app-subtitle" style={{ opacity: (Date.now() - this.state.start_time) > 3000 ? this.props.opacity : '1' }}>decentralized artificial intelligence</div>
                <div className="app-copyright" style={{ opacity: (Date.now() - this.state.start_time) > 3000 ? this.props.opacity : '1' }}>&copy; 2020 Solstice Project - github.com/solsticeproject</div>
            </div>
        )
    }
}

export default connect(common.mapStateToProps, common.mapDispatchToProps)(Loading);