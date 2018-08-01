import React, { Component } from 'react';
import Record from './Record'
import * as RecordsAPI from '../utils/RecordsAPI'

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


  render() {
    const {isLoaded,error,records} = this.state;

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading</div>;
      } else {
        return (
          <div>
            <h1>records</h1>
            <table className='table'>
              <thead>
                <tr>
                  <td> date</td>
                  <td> account</td>
                  <td> amount</td>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => <Record key={record.id} {...record} />)}
              </tbody>
            </table>
          </div>
        );
      }
    }
  }
