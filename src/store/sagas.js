/* eslint-disable no-constant-condition */

import { fork } from 'redux-saga/effects'
import { watchForFetchMany as watchForVehicleFetchMany } from '../modules/vehicles/sagas'
import dateWatchers from '../modules/dates/sagas'


export default function* root() {
  yield [
    fork(watchForVehicleFetchMany),
    fork(dateWatchers),
  ]
}
