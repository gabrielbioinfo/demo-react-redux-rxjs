import actions from '../../actions'

const initialState = {
  flash: { type: 'info', message: '' },
  loading: true,
  error: false,
  hasData: false,
  hasBottomMenu: false,
  id: null
}

export const application = (state = initialState, action) => {
  switch (action.type) {
    case actions.application.APPLICATION_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case actions.application.APPLICATION_CHANGE_TAB:
      return {
        ...state,
        selectedTab: action.payload.value
      }
    case actions.application.APPLICATION_CHANGE_TYPE:
      return {
        ...state,
        type: action.payload.type
      }
    case actions.application.APPLICATION_CHANGE_APP:
      return {
        ...state,
        app: action.payload.app,
        rootActivity: (action.payload.rootActivity ? action.payload.rootActivity.id : null)
      }
    case actions.application.APPLICATION_CHANGE_SCREEN:
      return {
        ...state,
        screen: action.payload.screen
      }
    case actions.application.APPLICATION_MESSAGE:
      return {
        ...state,
        error: false,
        flash: { type: 'info', message: action.payload.message }
      }

    case actions.application.APPLICATION_SET_ID:
      return {
        ...state,
        id: action.payload
      }

    case actions.application.APPLICATION_CRASH:
      return {
        ...state,
        error: true,
        flash: { type: 'error', message: action.payload.error.message },
        loading: false,
        hasData: false
      }

    case actions.application.FETCH_APP_COURSE_DATA:
    case actions.application.FETCH_APP_COURSES_DATA:
      return {
        ...state,
        loading: true,
        hasData: false
      }

    case actions.application.FETCH_APP_COURSE_DATA_SUCCESS:
    case actions.application.FETCH_APP_COURSES_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        hasData: true
      }

    default:
      return state
  }
}

export default application
