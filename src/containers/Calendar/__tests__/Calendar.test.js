import React from 'react'
import { shallow } from 'enzyme'

import { Calendar } from '../Calendar'

describe('(Component) Calendar', function() {

  let wrapper, props

  beforeEach(() => {
    props = {
      vehicles: [
        {
          "id": 1,
          "name": "Semi-trailer truck",
          "currency": "USD",
        },
        {
          "id": 2,
          "name": "20 foot swap-body truck",
          "currency": "EUR",
        }
      ],
      dates: [
        {
          date: '2017-01-07T05:19:04+00:00',
          schedules: {
            1: {
              price: 5000,
              inventory: 2
            },
            2: {
              price: 2345,
              inventory: 9
            }
          }
        },
        {
          date: '2017-01-08T05:19:04+00:00',
          schedules: {
            1: {
              price: 6000,
              inventory: 3
            },
            2: {
              price: 2345,
              inventory: 9
            }
          }
        },
      ],
      fetchManyVehicles: jest.fn(),
      fetchManyDates: jest.fn(),
      saveDate: jest.fn(),
      nextInterval: jest.fn(),
      previousInterval: jest.fn(),
    }

    wrapper = shallow(<Calendar {...props} />)
  })

  it('should be selectable by class "Calendar"', () => {
    expect(wrapper.is('.Calendar')).toBe(true)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call fetchManyVehicles and fetchManyDates on mount', () => {
    expect(props.fetchManyVehicles).toBeCalled()
    expect(props.fetchManyDates).toBeCalled()
  })

  it('should call nextInterval and fetchManyDates on "#next-interval" click', () => {
    wrapper.find('#next-interval').simulate('click')
    expect(props.nextInterval).toBeCalled()
    expect(props.fetchManyDates).toBeCalled()
  })

  it('should call previousInterval and fetchManyDates on "#previous-interval" click', () => {
    wrapper.find('#previous-interval').simulate('click')
    expect(props.previousInterval).toBeCalled()
    expect(props.fetchManyDates).toBeCalled()
  })

})