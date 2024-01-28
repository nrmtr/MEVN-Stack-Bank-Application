import axios from "axios"
axios.defaults.withCredentials = true

//axios setting
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})


export const axiosPrivateInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})
