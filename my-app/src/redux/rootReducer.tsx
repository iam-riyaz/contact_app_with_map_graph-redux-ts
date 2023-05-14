
import { combineReducers } from 'redux';
import {formReducer} from './reducer';

const rootReducer = combineReducers({
  formData: formReducer,
});

export default rootReducer;