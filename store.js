//dùng để chứa store(state)
import { createStore } from "./Core.js";
import reducer from "./reducer.js";

const {attach, connect,dispatch} = createStore(reducer)

window.dispatch = dispatch

export {
    attach, 
    connect
}