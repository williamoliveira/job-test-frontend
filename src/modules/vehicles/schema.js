import { Schema, arrayOf } from 'normalizr'

const vehicleSchema = new Schema('vehicles')
const vehicleListSchema = arrayOf(vehicleSchema)

export { vehicleSchema, vehicleListSchema }
