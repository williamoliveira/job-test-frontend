import { fetchManySuccess } from '../actions'
import { vehiclesEntityReducer } from '../reducers'

describe('vehicle reducers', () => {

  it('handles fetchManySuccess', () => {

    const stateBefore = {}

    const action = fetchManySuccess({
      1: {
        id: 1,
        foo: 'bar',
      },
      2: {
        id: 2,
        foo: 'baz',
      },
    })

    const stateAfter = {
      1: {
        id: 1,
        foo: 'bar',
      },
      2: {
        id: 2,
        foo: 'baz',
      },
    }

    expect(vehiclesEntityReducer(stateBefore, action)).toEqual(stateAfter)
  })

})