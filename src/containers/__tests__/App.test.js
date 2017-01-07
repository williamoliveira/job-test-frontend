import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Calendar from '../Calendar'
import BulkEdit from '../BulkEdit'

describe('(Component) App', () => {
  it('should render without crashing', () => {
    shallow(<App />)
  })

  it('should contain BulkEdit and Calendar children', () => {
    expect(shallow(<App />).contains(<BulkEdit />)).toBe(true)
    expect(shallow(<App />).contains(<Calendar />)).toBe(true)
  })
})

