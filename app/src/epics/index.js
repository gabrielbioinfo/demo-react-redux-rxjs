import 'rxjs';
import { combineEpics } from 'redux-observable';

import { fetchAppCourseData, fetchAppCoursesData } from './application';
import { fetchCourse  } from './course';
import { fetchUser    } from './user';

export default combineEpics( fetchAppCourseData, fetchAppCoursesData, fetchCourse, fetchUser );