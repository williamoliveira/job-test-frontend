
import { createAction } from '../../utils/reduxUtils'
import { NAME } from './constants'

export const fetchMany        = createAction(`${NAME}/FETCH_MANY`)
export const fetchManyStarted = createAction(`${NAME}/FETCH_MANY_STARTED`)
export const fetchManySuccess = createAction(`${NAME}/FETCH_MANY_SUCCESS`)
export const fetchManyFailed  = createAction(`${NAME}/FETCH_MANY_FAILED`)

export const save             = createAction(`${NAME}/SAVE`)
export const saveStarted      = createAction(`${NAME}/SAVE_STARTED`)
export const saveSuccess      = createAction(`${NAME}/SAVE_SUCCESS`)
export const saveFailed       = createAction(`${NAME}/SAVE_FAILED`)

export const bulkSave         = createAction(`${NAME}/BULK_SAVE`)
export const bulkSaveStarted  = createAction(`${NAME}/BULK_SAVE_STARTED`)
export const bulkSaveSuccess  = createAction(`${NAME}/BULK_SAVE_SUCCESS`)
export const bulkSaveFailed   = createAction(`${NAME}/BULK_SAVE_FAILED`)

export const nextInterval     = createAction(`${NAME}/NEXT_INTERVAL`)
export const previousInterval = createAction(`${NAME}/PREVIOUS_INTERVAL`)

