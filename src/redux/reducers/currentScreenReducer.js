import { UPDATE_CURRENT_SCREEN } from "../actions/currentScreenActions";

const initialState = {
    currentScreenIndex: 0
};

const currentScreenReducer = (state = initialState, action) => {
    const {currentScreenIndex} = action;

    switch(action.type) {
        case UPDATE_CURRENT_SCREEN:                
            return {...state, currentScreenIndex};
        default:
            return state;
    }
}

export default currentScreenReducer;