import { Schema, arrayOf } from 'normalizr'

const dateSchema = new Schema('dates', { idAttribute: 'date' })
const dateListSchema = arrayOf(dateSchema)

export { dateSchema, dateListSchema }
