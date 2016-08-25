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

export const pushStream = createAction('PUSH_STREAM')

export const fetchStreams = () => {
  return (dispatch) => {
    const path = '/streams'
    dispatch(fetch(path))
    return client.get(path)
      .then(res => res.data.forEach(item => dispatch(pushStream(item))))
      .catch(err => dispatch(error(err)))
  }
}

export const fetchStream = (id) => {
  return (dispatch) => {
    const path = `/stream/${id}`
    dispatch(fetch(path))
    return client.get(path)
      .then(res => dispatch(pushStream(res.data)))
      .catch(err => dispatch(error(err)))
  }
}
