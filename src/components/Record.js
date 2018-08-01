import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class Record extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.account}</td>
        <td>{this.props.amount}</td>
      </tr>
    );
  }
}

Record.propTypes = {
  id:PropTypes.string,
  date:PropTypes.number,
  account:PropTypes.string,
  amount:PropTypes.number

}
