import {getMany, getById} from '../selectors'

describe('date selectors', () => {

  const state = {
    entities: {
      dates: {
        '2017-01-05T00:09:28+00:00': {
          date: '2017-01-05T00:09:28+00:00',
          schedules: {}
        },
        '2017-02-05T00:09:28+00:00': {
          date: '2017-02-05T00:09:28+00:00',
          schedules: {}
        },
      }
    }
  }

  it('gets many dates from state', () => {

    const expectedDatesArray = [
      {
        date: '2017-01-05T00:09:28+00:00',
        schedules: {}
      },
      {
        date: '2017-02-05T00:09:28+00:00',
        schedules: {}
      },
    ]

    expect(getMany(state)).toEqual(expectedDatesArray)
  })

  it('gets one date from state by id', () => {

    const expectedDate = {
      date: '2017-01-05T00:09:28+00:00',
      schedules: {}
    }

    expect(getById(state, '2017-01-05T00:09:28+00:00')).toEqual(expectedDate)
  })

})