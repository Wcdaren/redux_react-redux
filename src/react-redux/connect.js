import React, { Component } from 'react';
import { Consumer } from './context';
import { bindActionCreators } from '../redux';
export default function (mapStateToProps, mapDispatchToProps) {
	return function (Component) {
		/**
		 * 我们写这个代理组件是为了逻辑复用
		 * 复用订阅的逻辑
		 */
		class Proxy extends Component {
			constructor(props) {
				super(props);
				this.state = mapStateToProps(props.store.getState());
			}
			componentDidMount() {
				this.unsubscribe = this.props.store.subscribe(() => {
					this.setState(mapStateToProps(this.props.store.getState()));
				});
			}
			componentWillUnmount() {
				this.unsubscribe();
			}
			render() {
				let actions = {};
				if (typeof mapDispatchToProps == 'object') {
					actions = bindActionCreators(mapDispatchToProps, this.props.store.dispatch);
				} else {
					actions = mapDispatchToProps(this.props.store.dispatch);
				}
				return <Component {...this.state} {...actions} />
			}
		}
		return () => (
			<Consumer>
				{
					value => (
						<Proxy store={value.store} />
					)
				}
			</Consumer>
		)
	}
}