import keycloak from '../keycloak'
import Axios from 'axios'

const setupAxiosInterceptors = (onUnauthenticated) => {
  const onRequestSuccess = (config) => {
    const token = keycloak.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }

  const onResponseSuccess = (response) => response
  const onResponseError = (err) => {
    const status = err.status || err.response.status
    if (status === 403 || status === 401) {
      onUnauthenticated()
    }
    return Promise.reject(err)
  }
  Axios.interceptors.request.use(onRequestSuccess)
  Axios.interceptors.response.use(onResponseSuccess, onResponseError)
}

export default setupAxiosInterceptors