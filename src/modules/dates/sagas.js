
import { call, put, takeLatest, spawn, select } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import resource from './apiResource'
import * as actions from './actions'
import { dateSchema, dateListSchema } from './schema'
import { getCurrentInterval } from './selectors'

export const normalizeDatesResponse = (response) => normalize(response, dateListSchema).entities.dates
export const normalizeDateResponse = (response) => normalize(response, dateSchema).entities.dates

// ------------------------------------
// Sub-routines
// ------------------------------------
export function* fetchManySaga() {
  try {
    yield put(actions.fetchManyStarted()) // Notify start

    const currentInterval = yield select(getCurrentInterval)

    const response = yield call(resource.fetchMany, currentInterval)

    const dates = normalizeDatesResponse(response)

    yield put(actions.fetchManySuccess(dates))  // Notify success
  } catch (e) {
    yield put(actions.fetchManyFailed(e)) // Notify Fail
    throw e
  }
}

export function* saveSaga({ payload = {} }) {
  try {
    yield put(actions.saveStarted()) // Notify start

    const response = yield call(resource.save, payload)

    const dates = normalizeDateResponse(response)

    yield put(actions.saveSuccess(dates))  // Notify success
  } catch (e) {
    yield put(actions.saveFailed(e)) // Notify Fail
    throw e
  }
}

export function* bulkSaveSaga({ payload = {} }) {
  try {
    yield put(actions.bulkSaveStarted()) // Notify start

    const response = yield call(resource.bulkSave, payload)

    yield put(actions.bulkSaveSuccess(response))  // Notify success

    yield put(actions.fetchMany())
  } catch (e) {
    yield put(actions.bulkSaveFailed(e)) // Notify Fail
    throw e
  }
}


// ------------------------------------
// Watchers
// ------------------------------------
export function* watchForFetchMany() {
  yield takeLatest(actions.fetchMany.type, fetchManySaga)
}

export function* watchForSave() {
  yield takeLatest(actions.save.type, saveSaga)
}

export function* watchForBulkSave() {
  yield takeLatest(actions.bulkSave.type, bulkSaveSaga)
}

export function* watchers() {
  yield [
    spawn(watchForFetchMany),
    spawn(watchForSave),
    spawn(watchForBulkSave),
  ]
}

export default watchers