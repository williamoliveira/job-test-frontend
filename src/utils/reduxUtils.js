/*
 * redux-act inspired helpers
 * @link https://github.com/pauldijou/redux-act
 */

export const createReducer = (actionHandlers, initialState) => (
  (state = initialState, {type, payload, meta}) => {
    const handler = actionHandlers[type]

    return handler ? handler(state, payload, meta) : state
  }
)

export const createAction = (type) => {
  const actionCreator = (payload, meta) => ({
    type,
    payload,
    meta,
  })

  actionCreator.type = type

  return actionCreator
}
