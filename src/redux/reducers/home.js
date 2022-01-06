import { SET_DATA } from '../actions';

const initialState = {
  result: [],
}

export default (state = initialState , action) => {

  switch(action.type) {
  
    case SET_DATA: {
       const {list} = action;
       const result = list
       return {...state,result};
     }

    default:
      return state;
      
  }
}
