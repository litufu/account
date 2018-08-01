import axios from 'axios';
const api = process.env.REACT_APP_RECORDS_API_URL || "https://5b611940bde36b0014081320.mockapi.io"

export const getAll = () =>
  axios.get(`${api}/api/v1/records`)

export const send = (data) =>
  axios.post(`${api}/api/v1/records`,data)

export const update = (id,data) =>
 axios.put(`${api}/api/v1/records/${id}`,data)
