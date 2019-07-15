import actions from '../../actions';

const initialState = [];
export const notifications = (state=initialState, action) => {
    switch(action.type){
        case actions.application.FETCH_APP_COURSE_DATA_SUCCESS:
            return [...action.payload.notifications];
        default:
            return [...state];
    }
}


