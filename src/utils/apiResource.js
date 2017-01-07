import Axios from 'axios'
import Qs from 'qs'
import clientConfig from '../config'

export const axios = Axios.create({
  baseURL: clientConfig.API_URL,
  paramsSerializer: params => Qs.stringify(params),
})

export const extractData = (res) => res.data

const defaultOptions = {
  axios,
  extractDataSingle: extractData,
  extractDataCollection: extractData,
}

export function createApiResource(endpoint, options) {
  const { axios, extractDataSingle, extractDataCollection } = { ...defaultOptions, ...options }

  return {
    fetchMany: (query) => axios.get(endpoint, { params: query }).then(extractDataCollection),
    fetchById: (id) => axios.get(`${endpoint}/${id}`).then(extractDataSingle),
    save: (data) => axios.post(endpoint, data).then(extractDataSingle),
    updateById: (id, data) => axios.put(`${endpoint}/${id}`, data).then(extractDataSingle),
    deleteById: (id) => axios.delete(`${endpoint}/${id}`).then(extractDataSingle),
  }
}

export default createApiResource