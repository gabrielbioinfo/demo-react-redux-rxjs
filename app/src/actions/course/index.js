export const COURSE_SECTION_ADD    = 'COURSE_SECTION_ADD';
export const COURSE_SECTION_REMOVE = 'COURSE_SECTION_REMOVE';
export const COURSE_SECTION_UPDATE = 'COURSE_SECTION_UPDATE';

export const COURSE_FETCH          = 'COURSE_FETCH_DATA';
export const COURSE_FETCH_SUCCESS  = 'COURSE_FETCH_DATA_SUCCESS';
export const COURSE_FETCH_FAILED   = 'COURSE_FETCH_DATA_FAILED';

export const courseSectionAdd = section => ({
    type: COURSE_SECTION_ADD,
    payload: { section }
});

export const courseSectionRemove = section => ({
    type: COURSE_SECTION_REMOVE,
    payload: { section }
});

export const courseSectionUpdate = (section, newSection) => ({
    type: COURSE_SECTION_REMOVE,
    payload: { section, newSection }
});

/** fetching data */
export const fetchCourse = courseid => ({
    type: COURSE_FETCH,
    payload: { courseid }
});

export const fetchCourseSuccess = course => ({
    type: COURSE_FETCH_SUCCESS,
    payload: { course }
});

export const fetchCourseFailed  = courseid =>({
    type: COURSE_FETCH_FAILED,
    payload: { courseid }
});