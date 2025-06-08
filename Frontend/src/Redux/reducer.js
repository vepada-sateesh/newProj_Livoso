import * as types from "./actionTypes"


let initalState = {
    isLoading: false,
    isError: false,
    data:[]
}
const reducer = (oldState = initalState, action) => {
    switch (action.type) {
        case types.DATA_REQ:
            return {
                ...oldState,
                isLoading:true,
            }
        case types.DATA_SUC:
            return {
                ...oldState,
                isLoading: false,
                data:action.payload
            }
        case types.DATA_FAI:
            return {
                ...oldState,
                isLoading: false,
                isError:true
            }
        default:
            return oldState
    }
}

export {reducer}