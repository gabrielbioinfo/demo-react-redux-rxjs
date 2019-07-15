import actions from '../../../actions'

const initialState = []
export const mycourses = (state = initialState, action) => {
  switch (action.type) {
    case actions.application.FETCH_APP_COURSES_DATA_SUCCESS:
      return [...action.payload.mycourses]
    default:
      return state
  }
}
