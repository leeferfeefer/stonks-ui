import { SAVE_STONK, DELETE_STONK } from "../actions/savedStonksActions";
import {getObjectsFromArrayWithoutFieldNameValue} from "../../utils/ObjectUtils";

const initialState = {
    savedStonks: []
};

const savedStonksReducer = (state = initialState, action) => {
    const {stonk} = action;

    switch(action.type) {
        case SAVE_STONK:                
            return {...state, savedStonks: [...state.savedStonks, stonk]};
        case DELETE_STONK:
            const stonks = getObjectsFromArrayWithoutFieldNameValue(state.savedStonks, 'symbol', stonk.symbol);
            return {...state, savedStonks: stonks};
        default:
            return state;
    }
}

export default savedStonksReducer;