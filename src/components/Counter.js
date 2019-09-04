import React, { Component } from 'react'
import store from '../store'
import * as types from '../store/action-types'

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
					onClick={() => store.dispatch({ type: types.INCREMENT })}
				>+</button>
				<button
					onClick={() => store.dispatch({ type: types.DECREMENT })}
				>-</button>
				<button
					onClick={() => {
						setTimeout(() => {
							store.dispatch({ type: types.INCREMENT })
						}, 1000);
					}}
				>过一秒后再加</button>
			</div>
		)
	}
}