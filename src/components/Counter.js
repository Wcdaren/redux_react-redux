import React, { Component } from 'react'
import store from '../store'
// import * as types from '../store/action-types'
import actions from '../store/action/counter'
import bindActionCreators from '../redux/bindActionCreators'

let newActions = bindActionCreators(actions, store.dispatch)



// function bindActionCreators(actionCreators, dispatch) {
// 	var boundActionCreators = {};
// 	for (var key in actionCreators) {
// 		let actionCreator = actionCreators[key];

// 		boundActionCreators[key] = function () {
// 			return dispatch(actionCreator.apply(this, arguments));
// 		};
// 	}
// 	return boundActionCreators;
// }
// console.log('<<<===newActions==>>>');
// console.log(newActions);
// console.log('==>>>><<<==');

// let newActions = {
// 	increment: () => store.dispatch(actions.increment()),
// 	decrement: () => store.dispatch(actions.decrement())
// }

export default class Counter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			number: store.getState().counter.number
		}
	}
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
			this.setState({ number: store.getState().counter.number })
		})
	}
	componentWillUnmount() {
		// 取消订阅 因为不能在一个卸载的组件里使用setState
		this.unsubscribe()
	}
	render() {
		return (
			<div>
				<p>{this.state.number}</p>
				<button
					// onClick={() => store.dispatch({ type: types.INCREMENT })}
					// onClick={() => store.dispatch(actions.increment())}
					onClick={newActions.increment}
				>+</button>
				<button
					// onClick={() => store.dispatch({ type: types.DECREMENT })}
					// onClick={() => store.dispatch(actions.decrement())}
					onClick={newActions.decrement}
				>-</button>
				<button
					onClick={() => {
						setTimeout(() => {
							// store.dispatch({ type: types.INCREMENT })
							store.dispatch(newActions.increment)
						}, 1000);
					}}
				>过一秒后再加</button>
			</div>
		)
	}
}