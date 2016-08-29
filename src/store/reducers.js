import sortBy from 'sort-by'
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { handleAction, handleActions } from 'redux-actions'
import { toggle, filter, sort, pushStream } from './actions'

const sortField = (order, field) => order ? (order > 0 ? '' : '-') + field : false

export const toggles = handleAction(toggle, {
  next: (state, action) => Object.assign({}, state, {
    [action.payload]: !state[action.payload]
  })
}, {})

export const filtering = handleAction(filter, {
  next: (state, action) => action.payload
}, '')

export const sorts = handleAction(sort, {
  next: (state, action) => {
    return {
      [action.payload]: ((1 + (state[action.payload] || 0) + 1) % 3) - 1
    }
  }
}, {})

export const streams = handleActions({
  [pushStream]: (state, { payload }) => {
    state[payload.id] = payload
    return [state[payload.id], state[1]]
  }
}, [{}, []])

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    toggles,
    sorts,
    filtering,
    streams,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export const applySort = (prevState, nextState, action, dispatch) => {
  const streamStore = nextState.streams[0]
  const usePrevStreams = prevState.filtering.length < nextState.filtering.length ? 1 : 0

  let streams = nextState.streams[1]

  if (!usePrevStreams) {
    streams = Object.keys(nextState.streams[0]).map(id => streamStore[id])
  }

  streams = streams
    .filter(item => nextState.filtering ? item.name.indexOf(nextState.filtering) > -1 : true)
    .sort(sortBy(sortField(nextState.sorts.bph, 'bph') || '-listeners'))

  nextState.streams[1] = streams
}

export default makeRootReducer
