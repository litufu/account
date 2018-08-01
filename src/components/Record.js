import React, { Component } from 'react';

export default class Record extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.account}</td>
        <td>{this.props.record.amount}</td>
      </tr>
    );
  }
}
