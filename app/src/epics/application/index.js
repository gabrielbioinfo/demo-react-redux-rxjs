import actions from '../../actions';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { map, catchError, mergeMap } from 'rxjs/operators';
import util from '../../util';

export const fetchAppCourseData = action$ =>
    action$
    .pipe(
        ofType(actions.application.FETCH_APP_COURSE_DATA),
        mergeMap((action)=>{
            return ajax.getJSON(action.payload.api)
            .pipe(
                map( response => {
                    if(!response)
                        return actions.application.applicationCrash( new Error("Não foi possível buscar os dados do curso!") )

                    if(response.hasOwnProperty('application'))
                        response.application.id = action.payload.id;
                    
                    return actions.application.fetchAppCourseDataSuccess( response );
                })
            )
            .pipe(
                catchError( error => actions.application.applicationCrash(error))
            )}
        )
    );

export const fetchAppCoursesData = action$ =>
    action$
    .pipe(
        ofType(actions.application.FETCH_APP_COURSES_DATA),
        mergeMap((action)=>{
            return ajax.getJSON(action.payload)
            .pipe(
                map( response => {
                    if(!response)
                        return actions.application.applicationCrash( new Error("Não foi possível buscar os dados do curso!") )
                    return actions.application.fetchAppCoursesDataSuccess( response )
                })
            )
            .pipe(
                catchError( error => actions.application.applicationCrash(error))
            )}
        )
    );