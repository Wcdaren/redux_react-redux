// export default reducers => (state = {}, action) =>
//     Object.keys(reducers).reduce((currentState, key) => {
//         currentState[key] = reducers[key](state[key], action);
//         return currentState;
//     }, {});

export default function combineReducers(reducers) {
    return function (state = {}, action) {
        return Object.keys(reducers).reduce((newState, key) => {
            newState[key] = reducers[key](state[key], action);
            return newState;
        }, {});
    }
}