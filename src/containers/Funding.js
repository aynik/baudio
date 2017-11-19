import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const computeComponent = state => ({
  topup: require('../containers/TopUp').default,
  account: require('../containers/Account').default 
})[state]

const mapStateToProps = state => ({
  component: computeComponent(state.funds.state)
})

export const Funding = connect(
  mapStateToProps,
  null
)(props => {
  const ConnectedWrappedComponent = props.component  
  return <ConnectedWrappedComponent {...props} />
})

export default Funding
