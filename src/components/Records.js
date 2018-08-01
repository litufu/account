import React, { Component } from 'react';
import Record from './Record'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'

export default class Records extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoaded:false,
      error:null,
      records:[]
    }
  }

  componentDidMount() {
    RecordsAPI.getAll().then(
      response => this.setState({
        records: response.data,
        isLoaded: true
      })
    ).catch(
      error => this.setState({
        isLoaded: true,
        error
      })
    )
  }

  addData(data){
    console.log(data)
    this.setState({
        isLoaded:true,
        error:null,
        records:[...this.state.records,data]
      }
    )
  }

  updateData(record,data){
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((record,index)=>{
      if(index === recordIndex){
        return {...record,...data};
      }else{
        return record;
      }
    })
    this.setState({
      records:newRecords
    })
  }

  deleteData(record){
    const recordIndex = this.state.records.indexOf(record)
    const newRecords = this.state.records.filter((item,index)=>index!== recordIndex)
    this.setState({
      records:newRecords
    })
  }

  render() {
    const {isLoaded,error,records} = this.state;
    let recordElement ;
    if (error) {
        recordElement =  <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        recordElement = <div>Loading</div>;
      } else {
        recordElement = (
          <div>
            <table className='table'>
              <thead>
                <tr>
                  <td> date</td>
                  <td> account</td>
                  <td> amount</td>
                </tr>
              </thead>
              <tbody>
                {records.map((record) =>
                  (<Record
                    key={record.id}
                    record={record}
                    onUpdate={this.updateData.bind(this)}
                    onDelete={this.deleteData.bind(this)}
                 /> )
               )}
              </tbody>
            </table>
          </div>
        );
      }

      return(
        <div>
          <RecordForm onSubmitData={this.addData.bind(this)}/>
          <h1>records</h1>
          {recordElement}
        </div>
      )
    }
  }
