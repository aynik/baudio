import React, { PropTypes } from 'react'
import smoogs from 'smoogs-client'
import QRCode from 'qrcode.react'

import { awaitUtxos } from '../actions'
import classes from '../styles/styles.scss'

class TopUp extends React.Component {
  componentDidMount () {
    const { utxos, dispatch } = this.props
    const address = smoogs.fundingAddress.toString()

    if (!utxos) {
      dispatch(awaitUtxos(address))
    }
  }

  render () {
    const { utxos, refundAddress, onBlur, onClick } = this.props
    const address = smoogs.fundingAddress.toString()
    console.log(`bitcoin:${address}?r=https://81.203.62.211:8000/invoice/${address}`)
    let satoshis = utxos
      ? utxos.reduce((r, u) => r + u.amount, 0) * 1e8
      : 0
    return (<section className={classes.funds}>
      { utxos
        ? <div><em>Funded</em>
          <i className={classes['icon-ticket']} />{satoshis}
          <em>{address}</em>
        </div>
        : '' }
      <QRCode size={160} value={`bitcoin:${address}?r=https://81.203.62.211:8000/invoice/${address}`} />
      <p>{ !utxos
        ? <span><em>Fund your wallet</em>&nbsp;
          {address}
        </span>
        : ''}</p>
      <p>{ refundAddress
        ? <span><em>Change returns to</em>&nbsp;
          {refundAddress}
        </span>
        : utxos
          ? <textarea
            placeholder='Please provide a return address'
            onBlur={onBlur} />
          : ''
      }</p>
      { utxos && refundAddress
        ? <section>
          <button onClick={onClick}>Commit</button>
          <button>Withdraw</button>
        </section>
        : '' }
    </section>)
  }
}

TopUp.propTypes = {
  utxos: PropTypes.array,
  refundAddress: PropTypes.string,
  dispatch: PropTypes.func,
  onChange: PropTypes.func
}

export default TopUp
