import { fetchManySuccess } from '../actions'
import { datesEntityReducer } from '../reducers'

describe('date reducers', () => {

  it('handles fetchManySuccess', () => {

    const stateBefore = {}
    const action = fetchManySuccess({ foo: 'bar'})
    const stateAfter = { foo: 'bar'}

    expect(datesEntityReducer(stateBefore, action)).toEqual(stateAfter)
  })

})