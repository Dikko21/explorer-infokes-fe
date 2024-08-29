import axios from "axios";

export const getFile = (signal) => axios.get(`${process.env.REACT_APP_API_URL}/file`, { signal: signal })
export const PostFile = (body) => axios.post(`${process.env.REACT_APP_API_URL}/file`, body)