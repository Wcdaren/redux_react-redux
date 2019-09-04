/**
 * 创建一个Redux仓库来保存整个状态树
 * 改变状态树的唯一方法是调用store.dispatch方法
 * 在整个应用中只能有一个仓库
 * 为了指定状态树的各个部分如何响应action的变化，你可能使用combineReducers方法把多个reducer合并为一个单独的reducer
 * 
 * @param {Function} reducer 一个通过当前状态对象和要处理的action返回新的状态树的函数
 * @param {any} [preloadedState] 初始状态。在同构应用中，你可能需要指定它以合并来自服务器的状态，或者从一个以前序列化的用户会话中恢复. 
 * 如果你使用了combineReducers,来从根reducer中产生状态，这必须是一个和combineReducer 的keys相同形状的对象
 * @param {Function} [enhancer] 仓库的enhancer. 你可能需要指定这个去增强仓库的能力以使用第三方的能力比如中间件
 * 时间旅行，持久化等等。redux自带的唯一中间件是applyMiddleware
 * @returns {Store} 是一个Redux仓库让你可以读取状态，派发action并订阅状态变化
 */
export default function (reducer, preloadedState) {
    let state = preloadedState;
    let listeners = [];
    function getState() {
        // return state;
        return JSON.parse(JSON.stringify(state));
    }


    //派发分发的意思
    //action 动作 描述一下你想干什么,动作是一个普通的JS对象，只有一个属性是必须的。type,其它属性随意 
    function dispatch(action) {
        //接收新的动作后，通过 才状态 和新动作计算出新状态
        state = reducer(state, action);
        //然后通过所有的监听函数执行
        listeners.forEach(listener => listener());
    }
    //派发了一个动作获取初始值，其实在redux内部是派发一个INIT: '@@redux/INIT'动作
    dispatch({ type: '@@redux/INIT' });
    //订阅，供外界订阅本仓库中状态的变化 ，如果状态 变化 了会执行订阅的逻辑 

    
    function subscribe(listener) {
        listeners.push(listener);
        //返回一个取消订阅函数
        return function () {
            listeners = listeners.filter(item => item !== listener)
        }
    }
    return {
        getState, dispatch, subscribe
    }
}