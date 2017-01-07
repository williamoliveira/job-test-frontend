import { denormalize } from 'denormalizr'
import { createSelector } from 'reselect'
import { vehicleSchema, vehicleListSchema } from './schema'
import { vehiclesKey } from './reducers'

const getEntities = (state) => state.entities || {}
const getVehicles = (state) => getEntities(state)[vehiclesKey] || {}

const getVehicleIds = createSelector(
  [getVehicles],
  (vehicle) => Object.keys(vehicle)
)

export const getMany = createSelector(
  [getEntities, getVehicleIds],
  (entities, vehicleIds) => denormalize(vehicleIds, entities, vehicleListSchema) || []
)

export const getById = createSelector(
  [getEntities, (_, id) => id],
  (entities, id) => denormalize(id, entities, vehicleSchema)
)
