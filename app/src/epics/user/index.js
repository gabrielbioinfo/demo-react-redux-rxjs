import actions from '../../actions';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { map, catchError, mergeMap} from 'rxjs/operators';

export const fetchUser = actions$ =>
  actions$
    .pipe(
        ofType(actions.user.FETCH_USER),
        mergeMap((action)=>
            ajax.getJSON(`https://api.github.com/users/${action.payload.username}`)
            .pipe(
                map( user => actions.user.fetchUserSuccess(user)),
                catchError(error => actions.user.fetchUserFailed())
            )
        )
    );