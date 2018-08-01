import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as RecordsAPI from '../utils/RecordsAPI'

export default class Record extends Component {
  constructor(props){
    super(props);
    this.state={
      edit:false
    }
  }

  handleEditClick(){
    this.setState( prevState=>({
      edit:!prevState.edit
    }));
  }


  handleUpdate(){
    let date = parseInt(this.refs.date.value,0);
    let account = this.refs.account.value;
    let amount = parseInt(this.refs.amount.value,0);
    let id = this.props.record.id
    let data = {date,account,amount}
    console.log(data)
    RecordsAPI.update(id,data).then(
      response=>{
        this.setState({edit:false})
        this.props.onUpdate(this.props.record,{id,date,account,amount})
      }
    ).catch(
      error=>console.log(error.message)
    )

  }

  handleDelete(){
    RecordsAPI.remove(this.props.record.id).then(
      response=>this.props.onDelete(this.props.record)
    ).catch(
      error => console.log(error.message)
    )
  }

  render() {
    if(!this.state.edit){
      return (
        <tr>
          <td>{this.props.record.date}</td>
          <td>{this.props.record.account}</td>
          <td>{this.props.record.amount}</td>
          <td>
            <button onClick={this.handleEditClick.bind(this)}>edit</button>
            <button onClick={this.handleDelete.bind(this)}>delete</button>
          </td>
        </tr>
      );
    } else{
      return (
        <tr>
          <td><input type='text' className='form-control' defaultValue={this.props.record.date} ref='date'/></td>
          <td><input type='text' className='form-control' defaultValue={this.props.record.account} ref='account' /></td>
          <td><input type='text' className='form-control' defaultValue={this.props.record.amount} ref='amount'/></td>
          <td>
            <button onClick={this.handleUpdate.bind(this)}>update</button>
            <button onClick={this.handleEditClick.bind(this)}>cansel</button>
          </td>
        </tr>
      );
    }
  }
}

Record.propTypes = {
  id:PropTypes.string,
  date:PropTypes.number,
  account:PropTypes.string,
  amount:PropTypes.number

}
