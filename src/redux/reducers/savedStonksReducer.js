import { SAVE_STONK, DELETE_STONK } from "../actions/savedStonksActions";


const initialState = {
    savedStonks: []
};

const savedStonksReducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_STONK:        
            const {stonk} = action;
            return {...state, savedStonks: [...state.savedStonks, stonk]};
        default:
            return state;
    }
}

export default savedStonksReducer;