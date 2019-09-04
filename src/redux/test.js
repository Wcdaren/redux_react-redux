function createStore(reducer) {



	return
}

let reducer = (state = {}, action) => {
	/**
	 * state : 原有的状态
	 * action: 派发任务时传递的行为对象…
	 */
	switch (action.type) {
		// ...根据type执行不同的操作
	}

	return state
}


function reducerA(state = { n: 1, m: 2 }, action) {
	return state
}
function reducerB(state = { a: 1, b: 2 }, action) {
	return state
}



function combineReducers(reducers) {
	return function reducer(state = {}, action) {
		let keys = Object.keys(reducers)
		let allState = keys.reduce((curState, key) => {
			curState[key] = reducers[key]
			return curState
		}, {})
		return allState
	}
}

let allState = combineReducers({ reducerA, reducerB })
console.log('<<<===allState==>>>');
console.log(allState);
console.log('==>>>><<<==');


