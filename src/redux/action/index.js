import ActionType from "../reducer/GlobalActionType"

export const actionAuth = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: ActionType.CHANGE_AUTH, value: 'Update Auth' })
    }, 2000)
}