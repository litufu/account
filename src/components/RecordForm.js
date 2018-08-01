import React, { Component } from 'react';


export default class RecordForm extends Component {
  constructor(props){
    super(props);
    this.state={
      date:'',
      account:'',
      amount:''
    }
    this.onHandleChange = this.onHandleChange.bind(this)
  }

  onHandleChange(event){
    const {name,value} = event.target;
    this.setState({
      [name]:value
    })
  }

  valid() {
    return this.state.date && this.state.account && this.state.amount
  }


  render() {
    return (
      <form className='form-inline'>
        <input type='text' name='date' placeholder='date'  onChange={this.onHandleChange} value={this.props.date}/>
        <input type='text' name='account' placeholder='account'  onChange={this.onHandleChange} value={this.props.account}/>
        <input type='text' name='amount' placeholder='amount'  onChange={this.onHandleChange} value={this.props.amount}/>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>

    );
  }
}
