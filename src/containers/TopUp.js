import { connect } from 'react-redux'
import { setRefundAddress, setFundingState } from '../actions'

const mapStateToProps = (state) => ({
  refundAddress: state.funds.refundAddress,
  utxos: state.funds.utxos,
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onClick: e => {
      dispatch(setFundingState('account'))
    },
    onBlur: e => {
      dispatch(setRefundAddress(e.currentTarget.value))
    }
  }
}

export const TopUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(require('../components/TopUp').default)

export default TopUp
