import actions from '../../../actions'

const initialState = []

export const weekreports = (state = initialState, action) => {
  let newState = [...state]
  switch (action.type) {
    case actions.application.FETCH_APP_COURSE_DATA_SUCCESS:
      return [...action.payload.weekreports]
    default:
      return newState
  }
}
