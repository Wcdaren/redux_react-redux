import * as types from '../action-types'
export default function (state = { items: [] }, action) {
	switch (action.type) {
		case types.ADD_TODO:
			return [...state.items, { text: action.text, completed: false }]
		case types.DEL_TODO:
			return [...state.items.slice(0, action.index),
			...state.items.slice(action.index + 1)]
		case types.TOGGLE_TODO:
			return state.items.map((item, index) => {
				if (index === action.index) {
					item.completed = !item.completed
				}
				return item
			})
		default:
			return state
	}
}