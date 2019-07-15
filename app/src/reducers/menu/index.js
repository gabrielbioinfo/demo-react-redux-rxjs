import actions from '../../actions';

const initialState = {};

export const menu = (state=initialState, action) => {
    switch(action.type){
        case actions.application.FETCH_APP_COURSE_DATA_SUCCESS:
            return {...action.payload.menu};
        default:
            return state;
    }
}

export default menu;
