import {createAction, createReducer } from '../reduxUtils'

describe('reduxUtils', () => {

  describe('createAction', () => {

    it('should create an action creator with type attribute', () => {
      expect(typeof createAction("FOO")).toEqual('function')
      expect(createAction("FOO").type).toEqual("FOO")
    })

    it('should create an action without payload', () => {
      const fooActionCreator = createAction("FOO")

      expect(fooActionCreator()).toEqual({
        type: "FOO",
      })
    })

    it('should create an action with payload', () => {
      const fooActionCreator = createAction("FOO")

      expect(fooActionCreator({bar: 'baz'})).toEqual({
        type: "FOO",
        payload: {bar: 'baz'}
      })
    })
  })

  describe('createReducer', () => {

    const actionHandlers = {
      "TYPE1": (state, payload = {}) => payload,
      "TYPE2": (state, payload = {}) => payload,
    }

    const initialState = {}

    it('should create a reducer', () => {
      const reducer = createReducer(actionHandlers, initialState)

      expect(typeof reducer).toEqual('function')
    })

    it('should create a reducer that handles actions', () => {
      const previousState = {}

      const action = {
        type: "TYPE1",
        payload: {
          foo: 'bar'
        }
      }

      const nextState = {
        foo: 'bar'
      }

      const reducer = createReducer(actionHandlers, initialState)

      expect(reducer(previousState, action)).toEqual(nextState)
    })

  })

})