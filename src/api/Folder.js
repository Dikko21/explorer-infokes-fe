import axios from "axios";

export const GetFolder = (signal) => axios.get(`${process.env.REACT_APP_API_URL}/folder`, { signal: signal })
export const GetFolderById = (signal, id) => axios.get(`${process.env.REACT_APP_API_URL}/folder/${id}`, { signal: signal })
export const GetChildFolderById = (signal, id) => axios.get(`${process.env.REACT_APP_API_URL}/folder/child/${id}`, { signal: signal })
export const PostFolder = (body) => axios.post(`${process.env.REACT_APP_API_URL}/folder`, body)