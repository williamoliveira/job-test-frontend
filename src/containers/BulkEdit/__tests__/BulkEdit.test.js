import React from 'react'
import { shallow } from 'enzyme'

import { BulkEdit } from '../BulkEdit'

describe('(Component) BulkEdit', function() {

  let wrapper, props

  beforeEach(() => {
    props = {
      vehicles: [
        {
          "id": 1,
          "name": "Semi-trailer truck",
        },
        {
          "id": 2,
          "name": "20 foot swap-body truck",
        }
      ],
      bulkSaveDate: jest.fn(),
    }

    wrapper = shallow(<BulkEdit {...props} />)
  })

  it('should be selectable by class "BulkEdit"', () => {
    expect(wrapper.is('.BulkEdit')).toBe(true)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should not call bulkSaveDate on submit if values are invalid', () => {
    wrapper.find('#bulkedit-submit').simulate('click')
    expect(props.bulkSaveDate).not.toBeCalled()
  })

  it('should call bulkSaveDate on submit if values are valid', () => {
    wrapper.setState({
      vehicleId: 1,
      from: '2017-01-07T05:54:12.071Z',
      to: '2017-01-18T05:54:12.071Z',
      refine: {
        all: false,
        mondays: true,
        thursdays: true,
        fridays: false,
        wednesdays: false,
        tuesdays: false,
        saturdays: false,
        sundays: false,
        weekdays: false,
        weekends: false,
      },
      price: 1337,
      inventory: 3,
    })

    wrapper.find('#bulkedit-submit').simulate('click')

    expect(props.bulkSaveDate).toBeCalledWith({
      vehicle_id: 1,
      from: '2017-01-07T05:54:12.071Z',
      to: '2017-01-18T05:54:12.071Z',
      refine: ['mondays', 'thursdays'],
      price: 1337,
      inventory: 3,
    })
  })

})