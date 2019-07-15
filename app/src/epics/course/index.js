import actions from '../../actions';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { map, catchError, mergeMap, debounceTime} from 'rxjs/operators';

export const fetchCourse = action$ =>
  action$
    .pipe(debounceTime(2000)) // adicionando 2 segundos de espera
    .pipe(
        ofType(actions.course.COURSE_FETCH),
        mergeMap((action)=>
            ajax.getJSON(`/data-course.json`)
            .pipe(
                map( response     => {
                    if(!response)
                        return actions.application.applicationCrash( new Error("Não foi possível buscar os dados do curso!") )
                    return actions.course.fetchCourseSuccess( response.course )
                })
            )
            .pipe(
                catchError( error => actions.application.applicationCrash(error))
            )
        )
    );