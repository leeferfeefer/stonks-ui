import { combineReducers } from 'redux'
import savedStonksReducer from './savedStonksReducer';
import currentScreenReducer from './currentScreenReducer';


export default combineReducers({
    savedStonksReducer,
    currentScreenReducer
});
