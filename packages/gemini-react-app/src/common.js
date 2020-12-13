import ReduxUtils from '@solsticeproject/gemini-redux-utils';

export function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            ...state,
        },
    };
}

export function mapDispatchToProps(dispatch, ownProps) {
    return {
        ...ownProps,
        dispatch,
        actions: {
            ...ReduxUtils.actions
        }
    }
}