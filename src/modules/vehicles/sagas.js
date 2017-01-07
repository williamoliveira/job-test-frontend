
import { call, put, takeLatest } from 'redux-saga/effects'
import resource from './apiResource'
import * as actions from './actions'
import { normalize } from 'normalizr'
import { vehicleListSchema } from './schema'

export function normalizeVehiclesResponse(response) {
  const normalized = normalize(response, vehicleListSchema)

  return normalized.entities.vehicles
}

// ------------------------------------
// Sub-routines
// ------------------------------------
export function* fetchManySaga() {
  try {
    yield put(actions.fetchManyStarted()) // Notify start

    const response = yield call(resource.fetchMany)

    const vehicles = normalizeVehiclesResponse(response)

    yield put(actions.fetchManySuccess(vehicles))  // Notify success
  } catch (e) {
    yield put(actions.fetchManyFailed(e)) // Notify Fail
    throw e
  }
}


// ------------------------------------
// Watchers
// ------------------------------------
export function* watchForFetchMany() {
  yield takeLatest(actions.fetchMany.type, fetchManySaga)
}