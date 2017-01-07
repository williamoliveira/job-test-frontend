
import { createAction } from '../../utils/reduxUtils'
import { NAME } from './constants'

export const fetchMany        = createAction(`${NAME}/FETCH_MANY`)
export const fetchManyStarted = createAction(`${NAME}/FETCH_MANY_STARTED`)
export const fetchManySuccess = createAction(`${NAME}/FETCH_MANY_SUCCESS`)
export const fetchManyFailed  = createAction(`${NAME}/FETCH_MANY_FAILED`)

export const fetchOne         = createAction(`${NAME}/FETCH_ONE`)
export const fetchOneStarted  = createAction(`${NAME}/FETCH_ONE_STARTED`)
export const fetchOneSuccess  = createAction(`${NAME}/FETCH_ONE_SUCCESS`)
export const fetchOneFailed   = createAction(`${NAME}/FETCH_ONE_FAILED`)
