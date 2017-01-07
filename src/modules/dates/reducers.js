
import moment from 'moment'
import { createReducer } from '../../utils/reduxUtils'
import * as actions from './actions'
import { NAME } from './constants'

export const datesKey = NAME
export const datesEntityReducer = createReducer({

  [actions.fetchManySuccess.type]: (state, payload = {}) => ({ ...payload }),

  [actions.saveSuccess.type]: (state, payload = {}) => ({
    ...state,
    ...payload
  }),

}, {})

// TODO remove?
export const datesUiKey = `${NAME}Ui`

const initialState = {
  currentInterval: {
    from: moment().toDate(),
    to: moment().add(11, 'days').toDate()
  }
}

export const datesUiReducer = createReducer({

  [actions.nextInterval.type]: (state, payload = {}) => ({
    ...state,
    currentInterval: {
      from: moment(state.currentInterval.to).add(1, 'days').toDate(),
      to: moment(state.currentInterval.to).add(12, 'days').toDate()
    }
  }),

  [actions.previousInterval.type]: (state, payload = {}) => ({
    ...state,
    currentInterval: {
      from: moment(state.currentInterval.from).subtract(12, 'days').toDate(),
      to: moment(state.currentInterval.from).subtract(1, 'days').toDate()
    }
  }),

}, initialState)
