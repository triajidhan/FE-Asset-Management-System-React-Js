import ActionType from "./GlobalActionType"

const globalState = {
    authStr: 'new auth',
    totalOrder: 5,
    popUp: false,
    isLogin: false,
    user: 'Alexa'
}

// Reducer
const rootReducer = (state = globalState, action) => {
    switch (action.type) {
        case ActionType.PLUS_ORDER:
            return {
                ...state,
                totalOrder: state.totalOrder + 1
            }
        case ActionType.MINUS_ORDER:
            let totalOrder = 0
            if (state.totalOrder > 0) {
                totalOrder = state.totalOrder - 1
            }
            return {
                ...state,
                totalOrder: totalOrder
            }
        case ActionType.CHANGE_AUTH:
            return {
                ...state,
                authStr: action.value
            }
        default:
            return state
    }
}

export default rootReducer