import { connect } from 'react-redux'
import { refundAddress } from '../actions'

const mapStateToProps = (state) => ({
  refundAddress: state.funds.refundAddress,
  utxos: state.funds.utxos,
  feePerKb: state.funds.feePerKb
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onChange: e => {
      dispatch(refundAddress(e.currentTarget.value))
    }
  }
}

export const TopUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(require('../components/TopUp').default)

export default TopUp
