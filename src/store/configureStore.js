import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import makeRootReducer from './reducers'
import rootSaga from './sagas'

const rootReducer = makeRootReducer()
const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  sagaMiddleware,
]

function configureStore(initialState) {
  const composeEnhancers = composeWithDevTools({})

  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares),
  )

  const store = initialState
    ? createStore(rootReducer, initialState, enhancers)
    : createStore(rootReducer, enhancers)

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
