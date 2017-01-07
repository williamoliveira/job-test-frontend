import { denormalize } from 'denormalizr'
import { createSelector } from 'reselect'
import { dateSchema, dateListSchema } from './schema'
import { datesKey, datesUiKey } from './reducers'

const getEntities = (state) => state.entities || {}
const getDates = (state) => getEntities(state)[datesKey] || {}

const getDateIds = createSelector(
  [getDates],
  (date) => Object.keys(date)
)

export const getMany = createSelector(
  [getEntities, getDateIds],
  (entities, dateIds) => denormalize(dateIds, entities, dateListSchema) || []
)

export const getById = createSelector(
  [getEntities, (_, id) => id],
  (entities, id) => denormalize(id, entities, dateSchema)
)

export const getCurrentInterval = (state) => state[datesUiKey].currentInterval