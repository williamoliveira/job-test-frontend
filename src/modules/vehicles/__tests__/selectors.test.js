import {getMany, getById} from '../selectors'

describe('vehicle selectors', () => {

  const state = {
    entities: {
      vehicles: {
        1: {
          id: 1,
          foo: 'bar',
        },
        2: {
          id: 2,
          foo: 'baz',
        },
      }
    }
  }

  it('gets many vehicles from state', () => {

    const expectedVehiclesArray = [
      {
        id: 1,
        foo: 'bar',
      },
      {
        id: 2,
        foo: 'baz',
      },
    ]

    expect(getMany(state)).toEqual(expectedVehiclesArray)
  })

  it('gets one vehicle from state by id', () => {

    const expectedVehicle = {
      id: 1,
      foo: 'bar',
    }

    expect(getById(state, 1)).toEqual(expectedVehicle)
  })

})