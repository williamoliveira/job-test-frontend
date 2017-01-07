import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions'
import { fetchManySaga, watchForFetchMany, normalizeVehiclesResponse } from '../sagas'
import resource from '../apiResource'

describe('vehicle sagas', () => {

  it('should normalizeVehiclesResponse', () => {
    const vehicles = [
      {
        id: 1,
        name: 'foo'
      },
      {
        id: 2,
        name: 'bar'
      },
    ]

    const normalizedVehicles = {
      1: {
        id: 1,
        name: 'foo'
      },
      2: {
        id: 2,
        name: 'bar'
      },
    }

    expect(normalizeVehiclesResponse(vehicles))
      .toEqual(normalizedVehicles)
  })

  it('should fetchManySaga', () => {
    const generator = fetchManySaga()

    const mockVehicles = [
      {
        id: 1,
        name: 'foo'
      },
      {
        id: 2,
        name: 'bar'
      },
    ]

    const normalizedMockVehicles = normalizeVehiclesResponse(mockVehicles)

    expect(generator.next().value)
      .toEqual(put(actions.fetchManyStarted()))

    expect(generator.next().value)
      .toEqual(call(resource.fetchMany))

    expect(generator.next(mockVehicles).value)
      .toEqual(put(actions.fetchManySuccess(normalizedMockVehicles)))
  })

  it('should fail at fetchManySaga', () => {
    const generator = fetchManySaga()

    generator.next()
    generator.next()

    expect(generator.throw('error').value)
      .toEqual(put(actions.fetchManyFailed('error')))
  })

  it('should watchForFetchMany', () => {
    const generator = watchForFetchMany()

    expect(generator.next().value)
      .toEqual(takeLatest(actions.fetchMany.type, fetchManySaga))
  })

})