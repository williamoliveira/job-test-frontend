import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as actions from '../actions'
import { fetchManySaga, watchForFetchMany, normalizeDatesResponse } from '../sagas'
import resource from '../apiResource'
import { getCurrentInterval } from '../selectors'
import moment from 'moment'

describe('date sagas', () => {

  const action = {
    type: 'MOCK_TYPE',
    payload: {
      from: moment().toDate(),
      to: moment().add(11, 'days').toDate()
    }
  }

  it('should normalizeDatesResponse', () => {
    const dates = [
      {
        date: '2017-01-05T00:09:28+00:00',
        schedules: {}
      },
      {
        date: '2017-02-05T00:09:28+00:00',
        schedules: {}
      },
    ]

    const normalizedDates = {
      '2017-01-05T00:09:28+00:00': {
        date: '2017-01-05T00:09:28+00:00',
        schedules: {}
      },
      '2017-02-05T00:09:28+00:00': {
        date: '2017-02-05T00:09:28+00:00',
        schedules: {}
      },
    }

    expect(normalizeDatesResponse(dates))
      .toEqual(normalizedDates)
  })

  it('should fetchManySaga', () => {

    const generator = fetchManySaga(action)

    const mockDates = [
      {
        date: '2017-01-05T00:09:28+00:00',
        schedules: {}
      },
      {
        date: '2017-02-05T00:09:28+00:00',
        schedules: {}
      },
    ]

    const normalizedMockDates = normalizeDatesResponse(mockDates)

    expect(generator.next().value)
      .toEqual(put(actions.fetchManyStarted()))

    expect(generator.next().value)
      .toEqual(select(getCurrentInterval))

    expect(generator.next().value)
      .toEqual(call(resource.fetchMany, undefined))

    expect(generator.next(mockDates).value)
      .toEqual(put(actions.fetchManySuccess(normalizedMockDates)))
  })

  it('should fail at fetchManySaga', () => {
    const generator = fetchManySaga(action)

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