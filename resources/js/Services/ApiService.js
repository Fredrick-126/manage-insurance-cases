import axios from 'axios'

const baseApiUrl = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : ''

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, PATCH, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, Content-Length, X-Requested-With',
}

export default class ApiService {
  getAll(resource) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${resource}`, { headers })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  query(resource, query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${resource}`, {
          params: { query },
        })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  get(resource, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${resource}/${id}`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  post(resource, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseApiUrl}/${resource}`, data)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  update(resource, id, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${resource}/${id}`, data)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  delete(resource, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${resource}/${id}`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
