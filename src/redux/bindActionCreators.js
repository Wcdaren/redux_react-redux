export default function bindActionCreators(actionCreators, dispatch) {
    var boundActionCreators = {};
    for (var key in actionCreators) {
        let actionCreator = actionCreators[key];

        boundActionCreators[key] = function () {
            return dispatch(actionCreator.apply(this, arguments));
        };
    }
    return boundActionCreators;
}