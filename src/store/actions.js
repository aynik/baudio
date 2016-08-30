import axios from 'axios'
import { createAction } from 'redux-actions'

const client = axios.create({
  baseURL: 'https://api.jam21.co'
})

export const error = createAction('ERROR')
export const toggle = createAction('TOGGLE')
export const filter = createAction('FILTER')
export const fetch = createAction('FETCH')
export const sort = createAction('SORT')

export const pushStreams = createAction('PUSH_STREAMS')

export const loadStreams = (n = -1) => {
  return (dispatch) => {
    if (n === -1) n = 0
    else if (n === 0) return Promise.resolve()
    const path = `/streams/1000/${n}`
    dispatch(fetch(path))
    return client.get(path)
      .then(({ data: [n, streams] }) =>
        dispatch(loadStreams(n)) &&
        dispatch(pushStreams(streams)))
  }
}

export const fetchStream = (id) => {
  return (dispatch) => {
    const path = `/stream/${id}`
    dispatch(fetch(path))
    return client.get(path)
      .then(res => dispatch(pushStreams([res.data])))
      .catch(err => dispatch(error(err)))
  }
}
