import React, { PropTypes } from 'react'

import { openAccount } from '../actions'
import classes from '../styles/styles.scss'

class Account extends React.Component {
  componentDidMount () {
    const { 
      account, refundAddress, utxos, dispatch
    } = this.props
    if (!account) {
      dispatch(openAccount({ utxos, refundAddress }))
    }
  }

  render () {
    const { utxos, refundAddress, account, onClick } = this.props
    const { id, consumedAmount } = account || {}
    let satoshis = utxos.reduce((r, u) => r + u.amount, 0) * 1e6 | 0
		let spent = consumedAmount + 713
		let left = satoshis - spent 
		let mask = left > spent ? left : spent
    return (<section className={classes.funds}>
			<div className={classes.funded}>
				{ account
					?	<div> 
						<em>Account</em>
						<em><strong>{id}</strong></em>
						<div className={classes.bph}>
							<em>
								<span>Balance</span>
								<span>{left}</span>
								<i className={classes['icon-ticket']} />
							</em>
							<em>
								<span>Spent</span>
								<span>{spent}</span>
								<i className={classes['icon-ticket']} />
							</em>
						</div>
					</div>
					: '' }
			</div>
      <p><span><em>Change returns to</em>&nbsp;
        {refundAddress}
      </span></p>
      <section>
        <button onClick={onClick}>Refund</button>
      </section>
    </section>)
  }
}

export default Account
