
import { createReducer } from '../../utils/reduxUtils'
import * as actions from './actions'
import { NAME } from './constants'

export const vehiclesKey = NAME

export const vehiclesEntityReducer = createReducer({

  [actions.fetchManySuccess.type]: (state, payload = {}) => ({ ...payload }),

  [actions.fetchOneSuccess.type]: (state, payload = {}) => ({
    ...state,
    [payload.id]: payload
  }),

}, {})
