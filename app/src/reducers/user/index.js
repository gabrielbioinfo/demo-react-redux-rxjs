import actions from '../../actions';

export const user = (state={}, action) => {
    switch(action.type){
        case actions.application.FETCH_APP_COURSE_DATA_SUCCESS:
            return {...action.payload.user};
        case actions.application.FETCH_COURSES_DATA:
        default:
            return state;
    }
}

export default user;
