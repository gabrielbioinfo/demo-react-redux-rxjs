import moment from 'moment';
import 'moment/locale/pt-br';
import actions from '../../../actions';
moment.locale('pt-BR');

const initialState = [];

export const activities = (state=initialState, action) => {
    let newState = [...state];
    switch(action.type){
        case actions.application.FETCH_APP_COURSE_DATA_SUCCESS:
            
            let activities = action.payload.activities.map(activity=>
                ({  ...activity
                    , startdate : activity.startdate
                                    ? moment(new Date(activity.startdate)): null
                    , enddate   : activity.enddate
                                    ? moment(new Date(activity.enddate))    : null
                    , layout    : activity.layout||'simple'
                    
                })
            );
            return [...activities];
        default:
            return newState;
    }
}


