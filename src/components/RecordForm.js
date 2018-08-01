import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI'


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



  handleSubmit(event){
    event.preventDefault()
    const  data = {date:parseInt(this.state.date,0),account:this.state.account,amount:parseInt(this.state.amount,0)}

    RecordsAPI.send(data).then(
        response => {
          this.props.onSubmitData(response.data);
          this.setState({
            date: "",
            account: "",
            amount: ""
          })
        }
      ).catch(
        error => console.log(error.message)
      )
    }



  render() {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit.bind(this)} >
        <input type='text' name='date' placeholder='date'  onChange={this.onHandleChange} value={this.state.date}/>
        <input type='text' name='account' placeholder='account'  onChange={this.onHandleChange} value={this.state.account}/>
        <input type='text' name='amount' placeholder='amount'  onChange={this.onHandleChange} value={this.state.amount}/>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>
    );
  }
}
