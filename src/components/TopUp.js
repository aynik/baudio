import React, { PropTypes } from 'react'
import smoogs from 'smoogs-client'
import QRCode from 'qrcode.react'

import { awaitUtxos } from '../actions'
import classes from '../styles/styles.scss'

const address = smoogs.fundingAddress.toString()

class TopUp extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(awaitUtxos(address))
  }

  render () {
    const { utxos, refundAddress, onChange } = this.props
    let satoshis = utxos.reduce((r, u) => r + u.satoshis, 0)
    return (<section className={classes.funds}>
      { utxos.length
        ? <div><em>Funded</em>
          <i className={classes['icon-ticket']} />{satoshis}
          <em>{address}</em>
        </div>
        : '' }
      <QRCode size={160} value={`bitcoin:${address}?r=https://81.203.62.211:8000/invoice/${address}`} />
      <p>{ !utxos.length
        ? <span><em>Fund your wallet</em>&nbsp;
          {address}
        </span>
        : ''}</p>
      <p>{ refundAddress
        ? <span><em>Change returns to</em>&nbsp;
          {refundAddress}
        </span>
        : utxos.length
          ? <textarea
            placeholder='Please provide a return address'
            onChange={onChange} />
          : ''
      }</p>
      { utxos.length && refundAddress
        ? <section>
          <button>Commit</button>
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
