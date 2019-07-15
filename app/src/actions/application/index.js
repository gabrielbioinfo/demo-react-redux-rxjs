export const APPLICATION_LOADING = 'APPLICATION_LOADING';
export const APPLICATION_MESSAGE = 'APPLICATION_MESSAGE';

export const APPLICATION_CHANGE_SCREEN = 'APPLICATION_CHANGE_SCREEN';
export const APPLICATION_CHANGE_TYPE   = 'APPLICATION_CHANGE_TYPE';

export const APPLICATION_CRASH   = 'APPLICATION_CRASH';
export const APPLICATION_CHANGE_TAB   = 'APPLICATION_CHANGE_TAB';

export const applicationCrash = error => ({
    type: APPLICATION_CRASH,
    payload: { error }
});

export const applicationChangeTab = value => ({
    type: APPLICATION_CHANGE_TAB,
    payload: { value }
});

export const setApplicationLoading = loading => ({
    type: APPLICATION_LOADING,
    payload: { loading }
});

export const applicationMessage = message => ({
    type: APPLICATION_MESSAGE,
    payload: { message }
});

export const applicationChangeScreen = screen => ({
    type: APPLICATION_CHANGE_SCREEN,
    payload: { screen }
});
export const applicationChangeType = type => ({
    type: APPLICATION_CHANGE_TYPE,
    payload: { type }
});

export const APPLICATION_CHANGE_APP = 'APPLICATION_CHANGE_APP';
export const applicationChangeApp = (app, rootActivity) => ({
    type: APPLICATION_CHANGE_APP,
    payload: { app, rootActivity }
});

// ---------------------------------------------------------

export const FETCH_APP_COURSE_DATA = 'FETCH_APP_COURSE_DATA';
export const fetchAppCourseData = data => ({
    type: FETCH_APP_COURSE_DATA,
    payload: data
});

export const FETCH_APP_COURSE_DATA_SUCCESS = 'FETCH_APP_COURSE_DATA_SUCCESS';
export const fetchAppCourseDataSuccess = data => ({
    type: FETCH_APP_COURSE_DATA_SUCCESS,
    payload: data
});

export const FETCH_APP_COURSES_DATA = 'FETCH_APP_COURSES_DATA';
export const fetchAppCoursesData = courseApi=> ({
    type: FETCH_APP_COURSES_DATA,
    payload: courseApi
});

export const FETCH_APP_COURSES_DATA_SUCCESS = 'FETCH_APP_COURSES_DATA_SUCCESS';
export const fetchAppCoursesDataSuccess = data => ({
    type: FETCH_APP_COURSES_DATA_SUCCESS,
    payload: data
});

export const APPLICATION_SET_ID = 'APPLICATION_SET_ID';
export const applicationSetId = id => ({
    type: APPLICATION_SET_ID,
    payload: id
});

// ---------------------------------------------------------