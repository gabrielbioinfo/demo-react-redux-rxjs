import actions from '../../../actions';

const initialState = {};
export const course = (state=initialState, action) => {
    let newState = {...state};
    switch(action.type){
        
        case actions.course.COURSE_FETCH_SUCCESS:
        case actions.application.FETCH_APP_COURSE_DATA_SUCCESS:
            return {...action.payload.course};
        
        default:
            return newState;
    }
}


