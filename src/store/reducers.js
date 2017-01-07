import { combineReducers } from 'redux'
import { vehiclesEntityReducer, vehiclesKey } from '../modules/vehicles/reducers'
import { datesEntityReducer, datesKey, datesUiReducer, datesUiKey } from '../modules/dates/reducers'

export const makeRootReducer = () => {
  return combineReducers({
    entities: combineReducers({
      [vehiclesKey]: vehiclesEntityReducer,
      [datesKey]: datesEntityReducer,
    }),
    [datesUiKey]: datesUiReducer
  })
}

export default makeRootReducer
