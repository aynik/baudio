import { connect } from 'react-redux'
import { closeAccount } from '../actions'

const assign = (prevstate, nextstate) => (
  Object.assign({}, prevstate, nextstate)
)

const mapStateToProps = state => ({
  refundAddress: state.funds.refundAddress,
  utxos: state.funds.utxos,
  account: state.objects.account,
  controller: state.objects.controller
})

const mapDispatchToProps = dispatch => ({
  dispatch 
})

const mergeProps = (stateProps, { dispatch } , ownProps) => assign(stateProps, {
  dispatch,
  onClick: e => {
    dispatch(closeAccount(stateProps.controller))
  }
})

export const Account = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(require('../components/Account').default)

export default Account
