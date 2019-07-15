import actions from '../../../actions';

const initialState = [];

export const appssections = (state=initialState, action) => {
    let newState = [...state];
    switch(action.type){
        
        case actions.application.FETCH_APP_COURSE_DATA_SUCCESS:
            return [...action.payload.appssections];
        default:
            return newState;
    }
}


