const redux = require('redux')
const createStore = redux.createStore

const initialState = {
    value: 0,
    age: 17
}

// Reducer
// Agent yang memiliki task list - task list
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_AGE':
            return {
                ...state,
                age: state.age + 1
            }
        case 'CHANGE_VALUE':
            return {
                ...state,
                value: state.value + action.newValue
            }
        default:
            return state
    }
}

// Store
// Hanya bisa di update di Reducer
const store = createStore(rootReducer)
console.log(store.getState())

// Subscription
// proses pemanggilan Store yang kita perlukan
// setiap kali perubahan pada Store, dia akan terpanggil
store.subscribe(() => {
    console.log('store change : ', store.getState())
})

// Dispatching (Action)
// Proses pemanggilan spesific task list reducer
store.dispatch({ type: 'ADD_AGE' })
store.dispatch({ type: 'CHANGE_VALUE', newValue: 12 })
console.log(store.getState())
